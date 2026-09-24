import { useCallback, useEffect, useRef, useState } from 'react'
import { Motif } from './Motif'

type MusicControlProps = {
  entered: boolean
}

const targetVolume = 0.55

export function MusicControl({ entered }: MusicControlProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeTimerRef = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  const fadeTo = useCallback((value: number, done?: () => void) => {
    const audio = audioRef.current
    if (!audio) return

    window.clearInterval(fadeTimerRef.current)
    const step = (value - audio.volume) / 28
    fadeTimerRef.current = window.setInterval(() => {
      const next = audio.volume + step
      const complete = (step > 0 && next >= value) || (step < 0 && next <= value) || step === 0

      if (complete) {
        audio.volume = Math.min(1, Math.max(0, value))
        window.clearInterval(fadeTimerRef.current)
        done?.()
      } else {
        audio.volume = Math.min(1, Math.max(0, next))
      }
    }, 45)
  }, [])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !available) return

    try {
      await audio.play()
      fadeTo(targetVolume)
      setPlaying(true)
    } catch (error) {
      setAvailable(false)
      setPlaying(false)
      console.info('Background music is unavailable until assets/audio/song.mp3 is supplied.', error)
    }
  }, [available, fadeTo])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    fadeTo(0, () => audio.pause())
    setPlaying(false)
  }, [fadeTo])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0

    const onError = () => {
      setAvailable(false)
      setPlaying(false)
    }
    audio.addEventListener('error', onError)
    return () => audio.removeEventListener('error', onError)
  }, [])

  useEffect(() => {
    const onInvitationOpened = () => {
      let preference: string | null = null
      try {
        preference = localStorage.getItem('ar-music')
      } catch (error) {
        console.warn('Unable to read the saved music preference.', error)
      }
      if (preference === 'on') void play()
    }

    document.addEventListener('invite:opened', onInvitationOpened)
    return () => document.removeEventListener('invite:opened', onInvitationOpened)
  }, [play])

  useEffect(() => {
    const onVisibilityChange = () => {
      const audio = audioRef.current
      if (!audio || !playing) return
      if (document.hidden) {
        audio.pause()
      } else {
        void audio.play().catch((error: unknown) => {
          setAvailable(false)
          setPlaying(false)
          console.info('Background music could not resume.', error)
        })
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [playing])

  useEffect(() => () => window.clearInterval(fadeTimerRef.current), [])

  const toggleMusic = () => {
    if (playing) pause()
    else void play()

    try {
      localStorage.setItem('ar-music', playing ? 'off' : 'on')
    } catch (error) {
      console.warn('Unable to save the music preference.', error)
    }
  }

  const label = playing ? 'Pause music' : 'Play music'

  return (
    <>
      <audio ref={audioRef} id="music" src="assets/audio/song.mp3" loop preload="none" />
      <button
        type="button"
        className={`music${entered ? ' is-live' : ''}${available ? '' : ' is-muted'}`}
        id="music-btn"
        aria-pressed={playing}
        aria-label={label}
        title={available ? label : 'Music will be added soon'}
        onClick={toggleMusic}
      >
        <span className="music__halo" aria-hidden="true" />
        <Motif className="music__glyph" id="m-lotus" />
        <span className="music__bars" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
      </button>
    </>
  )
}
