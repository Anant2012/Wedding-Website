import { useCallback, useEffect, useRef, useState } from 'react'
import { InvitationPages, PageFrame } from './components/InvitationPages'
import { MusicControl } from './components/MusicControl'
import { Navigation } from './components/Navigation'
import { OpeningInvitation } from './components/OpeningInvitation'
import { PetalCanvas, type PetalController } from './components/PetalCanvas'
import { useInvitationScenes } from './hooks/useInvitationScenes'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function App() {
  const reduced = useRef(prefersReducedMotion()).current
  const appRef = useRef<HTMLDivElement>(null)
  const petalsRef = useRef<PetalController>(null)
  const [entered, setEntered] = useState(reduced)
  const [gateVisible, setGateVisible] = useState(!reduced)
  const [dateRevealed, setDateRevealed] = useState(false)

  useInvitationScenes(appRef, petalsRef, entered)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', gateVisible)
    document.documentElement.classList.toggle('is-entered', entered)
    if (entered) {
      window.scrollTo(0, 0)
      petalsRef.current?.start()
    }
  }, [entered, gateVisible])

  useEffect(() => {
    if (!gateVisible && !reduced) {
      const heading = appRef.current?.querySelector('h1')
      heading?.setAttribute('tabindex', '-1')
      heading?.focus({ preventScroll: true })
    }
  }, [gateVisible, reduced])

  const handleEntered = useCallback(() => {
    setEntered(true)
  }, [])

  const handleOpeningComplete = useCallback(() => {
    setGateVisible(false)
  }, [])

  const handleDateReveal = useCallback(() => {
    setDateRevealed(true)
  }, [])

  return (
    <div ref={appRef} className="invitation-app">
      <PetalCanvas ref={petalsRef} isFront={false} />
      <PageFrame />
      {gateVisible && (
        <OpeningInvitation
          onEntered={handleEntered}
          onComplete={handleOpeningComplete}
        />
      )}
      <div
        className={`invitation-content${entered && !reduced ? ' invitation-content--arrived' : ''}`}
        inert={gateVisible}
      >
        <Navigation entered={entered} dateRevealed={dateRevealed} />
        {__HAS_INVITATION_MUSIC__ && <MusicControl entered={entered} />}
        <InvitationPages petalsRef={petalsRef} dateRevealed={dateRevealed} onDateReveal={handleDateReveal} />
      </div>
    </div>
  )
}
