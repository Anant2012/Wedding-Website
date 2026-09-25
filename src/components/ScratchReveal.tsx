import { useCallback, useEffect, useRef, useState } from 'react'
import type { PetalController } from './PetalCanvas'
import { PaperPattern } from './HeritageArt'
import { Motif } from './Motif'

type ScratchRevealProps = {
  petalsRef: React.RefObject<PetalController | null>
  revealed: boolean
  onReveal: () => void
  children: React.ReactNode
}

type Palette = {
  pale: string
  champagne: string
  soft: string
  gold: string
  blush: string
  goldRgb: string
}

const random = (min: number, max: number) => min + Math.random() * (max - min)
const REVEAL_THRESHOLD = 0.45

export function ScratchReveal({ petalsRef, revealed, onReveal, children }: ScratchRevealProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparkRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const focusDateRef = useRef(false)
  const revealedRef = useRef(revealed)
  const revealEffectsRef = useRef<(() => void) | null>(null)
  const [touched, setTouched] = useState(false)
  const [foilReady, setFoilReady] = useState(false)
  const [surfaceUnavailable, setSurfaceUnavailable] = useState(false)

  const revealDate = useCallback(() => {
    if (revealedRef.current) return
    focusDateRef.current = document.activeElement === buttonRef.current
    revealedRef.current = true
    setTouched(true)
    revealEffectsRef.current?.()
    onReveal()
  }, [onReveal])

  useEffect(() => {
    if (revealed && focusDateRef.current) {
      dateRef.current?.focus({ preventScroll: true })
    }
  }, [revealed])

  useEffect(() => {
    const card = cardRef.current
    const canvas = canvasRef.current
    const sparkLayer = sparkRef.current
    if (!card || !canvas || revealedRef.current) return

    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) {
      console.warn('The scratch surface is unavailable. Use the tap-to-reveal control.')
      setSurfaceUnavailable(true)
      return
    }

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let dpr = 1
    let width = 0
    let height = 0
    let drawing = false
    let disposed = false
    let surfaceAvailable = true
    let activePointer: number | null = null
    let hasTouched = false
    let lastPoint: { x: number; y: number } | null = null
    let moves = 0
    let lastSpark = 0
    let resizeTimer = 0
    const removalTimers = new Set<number>()

    const palette = (): Palette => {
      const styles = getComputedStyle(document.documentElement)
      const pick = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback
      return {
        pale: pick('--gold-pale', '#E5D6B7'),
        champagne: pick('--champagne', '#E0D0AE'),
        soft: pick('--gold-soft', '#C2A468'),
        gold: pick('--gold', '#A98545'),
        blush: pick('--blush', '#F3E4D8'),
        goldRgb: pick('--gold-rgb', '169, 133, 69'),
      }
    }

    const blossom = (x: number, y: number, radius: number, rotation: number) => {
      context.save()
      context.translate(x, y)
      context.rotate(rotation)
      for (let petal = 0; petal < 5; petal += 1) {
        context.beginPath()
        context.ellipse(0, -radius * 0.75, radius * 0.34, radius * 0.75, 0, 0, Math.PI * 2)
        context.stroke()
        context.rotate((Math.PI * 2) / 5)
      }
      context.beginPath()
      context.arc(0, 0, radius * 0.2, 0, Math.PI * 2)
      context.stroke()
      context.restore()
    }

    const drawFlourishes = (colors: Palette) => {
      context.save()
      context.strokeStyle = 'rgba(255,255,255,.55)'
      context.lineWidth = 0.9
      const columns = Math.max(4, Math.round(width / 62))
      const rows = Math.max(3, Math.round(height / 62))

      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          const x = (column + 0.5) * (width / columns) + random(-7, 7)
          const y = (row + 0.5) * (height / rows) + random(-7, 7)
          context.globalAlpha = random(0.22, 0.5)
          blossom(x, y, random(3.6, 6.4), random(0, Math.PI))
        }
      }

      context.globalAlpha = 0.3
      context.strokeStyle = 'rgba(255,255,255,.75)'
      ;[width * 0.42, width * 0.32, width * 0.2].forEach((radius) => {
        context.beginPath()
        context.arc(width / 2, height / 2, radius, 0, Math.PI * 2)
        context.stroke()
      })

      context.globalAlpha = 0.45
      context.strokeStyle = `rgba(${colors.goldRgb},.55)`
      context.lineWidth = 1
      context.strokeRect(9, 9, width - 18, height - 18)
      context.restore()
    }

    const drawLabel = (colors: Palette) => {
      context.save()
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      const middle = height / 2
      context.fillStyle = `rgba(${colors.goldRgb},.92)`
      context.font = `300 ${Math.max(13, Math.round(width * 0.036))}px 'Jost', system-ui, sans-serif`
      context.fillText('S C R A T C H   T O   R E V E A L', width / 2, middle + height * 0.2)
      context.fillStyle = `rgba(${colors.goldRgb},.62)`
      context.font = `italic 300 ${Math.max(15, Math.round(width * 0.052))}px 'Cormorant Garamond', serif`
      context.fillText('a little secret awaits', width / 2, middle - height * 0.2)

      context.strokeStyle = 'rgba(150,116,60,.55)'
      context.lineWidth = 1.1
      context.translate(width / 2, middle)
      const size = Math.min(width, height) * 0.1
      context.rotate(-Math.PI / 2 - Math.PI / 5)

      for (let petal = 0; petal < 5; petal += 1) {
        context.beginPath()
        context.moveTo(0, 0)
        context.quadraticCurveTo(size * 0.5, -size * 0.75, 0, -size * 1.35)
        context.quadraticCurveTo(-size * 0.5, -size * 0.75, 0, 0)
        context.stroke()
        context.rotate(Math.PI / 5)
      }

      context.restore()
    }

    const paintFoil = () => {
      const colors = palette()
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.globalCompositeOperation = 'source-over'

      const gradient = context.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, colors.pale)
      gradient.addColorStop(0.2, colors.champagne)
      gradient.addColorStop(0.42, colors.pale)
      gradient.addColorStop(0.6, colors.soft)
      gradient.addColorStop(0.8, colors.pale)
      gradient.addColorStop(1, colors.champagne)
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      const highlight = context.createRadialGradient(
        width * 0.22,
        height * 0.22,
        0,
        width * 0.22,
        height * 0.22,
        width * 0.7,
      )
      highlight.addColorStop(0, 'rgba(255,252,246,.78)')
      highlight.addColorStop(1, 'rgba(255,252,246,0)')
      context.fillStyle = highlight
      context.fillRect(0, 0, width, height)

      const warmth = context.createRadialGradient(
        width * 0.85,
        height * 0.85,
        0,
        width * 0.85,
        height * 0.85,
        width * 0.6,
      )
      warmth.addColorStop(0, `rgba(${colors.goldRgb},.3)`)
      warmth.addColorStop(1, `rgba(${colors.goldRgb},0)`)
      context.fillStyle = warmth
      context.fillRect(0, 0, width, height)
      drawFlourishes(colors)
      drawLabel(colors)
    }

    const resize = () => {
      if (!surfaceAvailable || !card.clientWidth || !card.clientHeight) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = card.clientWidth
      height = card.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      if (!revealedRef.current) {
        paintFoil()
        setFoilReady(true)
      }
    }

    const pointFromEvent = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: (event.clientX - rect.left) * width / rect.width,
        y: (event.clientY - rect.top) * height / rect.height,
      }
    }

    const scratch = (from: { x: number; y: number }, to: { x: number; y: number }) => {
      context.globalCompositeOperation = 'destination-out'
      const radius = Math.max(20, Math.min(width, height) * 0.12)
      context.lineWidth = radius * 2
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.beginPath()
      context.moveTo(from.x, from.y)
      context.lineTo(to.x, to.y)
      context.stroke()

      const feather = context.createRadialGradient(to.x, to.y, radius * 0.4, to.x, to.y, radius * 1.45)
      feather.addColorStop(0, 'rgba(0,0,0,1)')
      feather.addColorStop(1, 'rgba(0,0,0,0)')
      context.fillStyle = feather
      context.beginPath()
      context.arc(to.x, to.y, radius * 1.45, 0, Math.PI * 2)
      context.fill()
      context.globalCompositeOperation = 'source-over'
    }

    const scheduleRemoval = (element: HTMLElement, delay: number) => {
      const timer = window.setTimeout(() => {
        element.remove()
        removalTimers.delete(timer)
      }, delay)
      removalTimers.add(timer)
    }

    const sparkle = (x: number, y: number) => {
      if (motionPreference.matches || !sparkLayer) return
      const now = performance.now()
      if (now - lastSpark < 110) return
      lastSpark = now

      const sparkleElement = document.createElement('span')
      sparkleElement.className = 'spark'
      sparkleElement.style.left = `${x + random(-14, 14)}px`
      sparkleElement.style.top = `${y + random(-14, 14)}px`
      sparkLayer.appendChild(sparkleElement)
      scheduleRemoval(sparkleElement, 1500)
    }

    const goldDust = (count: number) => {
      if (motionPreference.matches || !sparkLayer) return
      for (let index = 0; index < count; index += 1) {
        const dust = document.createElement('span')
        dust.className = 'dust'
        dust.style.left = `${random(width * 0.06, width * 0.94)}px`
        dust.style.top = `${random(height * 0.2, height * 0.92)}px`
        dust.style.setProperty('--dx', `${random(-34, 34).toFixed(0)}px`)
        dust.style.setProperty('--dy', `${random(-52, -140).toFixed(0)}px`)
        dust.style.setProperty('--ds', random(0.5, 1.5).toFixed(2))
        dust.style.width = dust.style.height = `${random(2, 4.5).toFixed(1)}px`
        dust.style.animationDuration = `${random(1.6, 3.1).toFixed(2)}s`
        dust.style.animationDelay = `${random(0, 0.7).toFixed(2)}s`
        sparkLayer.appendChild(dust)
        scheduleRemoval(dust, 4200)
      }
    }

    const clearedRatio = () => {
      let data: Uint8ClampedArray
      try {
        data = context.getImageData(0, 0, canvas.width, canvas.height).data
      } catch (error) {
        console.error('Unable to inspect the scratch-card canvas.', error)
        surfaceAvailable = false
        setFoilReady(false)
        setSurfaceUnavailable(true)
        detach()
        return 0
      }

      let total = 0
      let cleared = 0
      for (let index = 3; index < data.length; index += 32) {
        total += 1
        if (data[index] < 42) cleared += 1
      }
      return total ? cleared / total : 0
    }

    const firstTouch = () => {
      if (hasTouched) return
      hasTouched = true
      setTouched(true)
    }

    const detach = () => {
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }

    const celebrateReveal = () => {
      const rect = card.getBoundingClientRect()
      if (!motionPreference.matches) {
        petalsRef.current?.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8)
        petalsRef.current?.boost(4, 2400)
      }
      goldDust(12)
      detach()
    }

    function onPointerDown(event: PointerEvent) {
      if (revealedRef.current || !event.isPrimary || event.button !== 0) return
      activePointer = event.pointerId
      drawing = true
      firstTouch()
      lastPoint = pointFromEvent(event)
      scratch(lastPoint, lastPoint)
      sparkle(lastPoint.x, lastPoint.y)
      if (event.cancelable) event.preventDefault()
    }

    function onPointerMove(event: PointerEvent) {
      if (!drawing || revealedRef.current || event.pointerId !== activePointer) return
      const point = pointFromEvent(event)
      const samples = event.getCoalescedEvents?.() ?? []
      for (const sample of samples.length ? samples : [event]) {
        const next = pointFromEvent(sample)
        scratch(lastPoint ?? next, next)
        lastPoint = next
      }
      sparkle(point.x, point.y)
      moves += 1
      if (moves % 10 === 0 && clearedRatio() >= REVEAL_THRESHOLD) revealDate()
      if (event.cancelable) event.preventDefault()
    }

    function onPointerUp(event: PointerEvent) {
      if (!drawing || event.pointerId !== activePointer) return
      drawing = false
      activePointer = null
      lastPoint = null
      if (!revealedRef.current && event.type !== 'pointercancel' && clearedRatio() >= REVEAL_THRESHOLD) revealDate()
    }

    const attach = () => {
      canvas.addEventListener('pointerdown', onPointerDown)
      window.addEventListener('pointermove', onPointerMove, { passive: false })
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (!revealedRef.current) resize()
      }, 200)
    }

    revealEffectsRef.current = celebrateReveal
    resize()
    attach()
    window.addEventListener('resize', onResize, { passive: true })
    void document.fonts?.ready.then(() => {
      if (!disposed && !revealedRef.current && !hasTouched) resize()
    })

    return () => {
      disposed = true
      detach()
      window.clearTimeout(resizeTimer)
      removalTimers.forEach((timer) => window.clearTimeout(timer))
      removalTimers.clear()
      sparkLayer?.replaceChildren()
      window.removeEventListener('resize', onResize)
      revealEffectsRef.current = null
    }
  }, [petalsRef, revealDate])

  return (
    <>
      <div className="keepsake__paper">
        <PaperPattern className="keepsake__lining" />
        <span className="keepsake__edition" aria-hidden="true">A &amp; R</span>
        <div
          ref={cardRef}
          className={`scratch${foilReady ? ' has-foil' : ''}${touched ? ' is-touched' : ''}${revealed ? ' is-revealed' : ''}`}
          id="scratch"
        >
          <Motif className="scratch__corner scratch__corner--tl" id="m-corner" />
          <Motif className="scratch__corner scratch__corner--tr" id="m-corner" />
          <Motif className="scratch__corner scratch__corner--bl" id="m-corner" />
          <Motif className="scratch__corner scratch__corner--br" id="m-corner" />

          <div className="scratch__prize" id="scratch-prize" aria-hidden={!revealed}>
            <Motif className="motif motif--lotus" id="m-lotus" />
            <p className="eyebrow">Thursday</p>
            <p ref={dateRef} className="date-big" tabIndex={revealed ? -1 : undefined} aria-label={revealed ? '3 December 2026' : undefined}>03<span>·</span>12<span>·</span>2026</p>
            <Motif className="motif motif--divider" id="m-divider" />
            <p className="script script--sm">The day our forever begins</p>
          </div>

          {!foilReady && !revealed && (
            <div className="scratch__placeholder" aria-hidden="true">
              <Motif className="motif motif--lotus" id="m-lotus" />
              <p>A little secret awaits&hellip;</p>
            </div>
          )}
          <canvas ref={canvasRef} className="scratch__canvas" id="scratch-canvas" aria-hidden="true" />
          <span ref={sparkRef} className="scratch__sparkles" id="scratch-sparkles" aria-hidden="true" />
        </div>
      </div>

      <div className="scratch__afterword">
        <div className="scratch__instructions" inert={revealed} aria-hidden={revealed}>
          <p className="hint" id="scratch-hint">
            <span className="hint__finger" aria-hidden="true" />
            {surfaceUnavailable ? 'Please tap below to reveal our secret.' : 'Gently scratch the golden surface'}
          </p>
          <button
            type="button"
            ref={buttonRef}
            className="link-btn"
            id="scratch-skip"
            disabled={revealed}
            aria-label="Reveal the wedding date"
            aria-describedby="scratch-hint"
            onClick={revealDate}
          >
            {surfaceUnavailable ? 'Tap to reveal' : 'or tap to reveal'}
          </button>
        </div>
        <div className="scratch__discovery" inert={!revealed} aria-hidden={!revealed}>
          {children}
        </div>
      </div>
      <p className="sr-only" role="status">
        {revealed ? 'The celebrations are now open. Continue below for the countdown and events.' : ''}
      </p>
    </>
  )
}
