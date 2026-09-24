import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

export type PetalController = {
  start: () => void
  stop: () => void
  boost: (amount?: number, duration?: number) => void
  burst: (x: number, y: number, amount?: number) => void
  setBase: (amount: number) => void
  reduced: boolean
}

type PetalCanvasProps = {
  isFront: boolean
}

type PetalKind = {
  fill: string
  edge: string
  width: number
  leaf: boolean
  weight: number
}

type Petal = {
  kind: number
  x: number
  y: number
  size: number
  vy: number
  vx: number
  sway: number
  swaySpeed: number
  phase: number
  rotation: number
  rotationSpeed: number
  flip: number
  flipSpeed: number
  alpha: number
  life: number
  fade?: number
}

const kinds: PetalKind[] = [
  { fill: 'rgba(255,253,250,', edge: 'rgba(234,216,200,', width: 1, leaf: false, weight: 4 },
  { fill: 'rgba(247,226,224,', edge: 'rgba(226,190,186,', width: 0.95, leaf: false, weight: 3 },
  { fill: 'rgba(240,196,118,', edge: 'rgba(214,160,78,', width: 0.8, leaf: false, weight: 2 },
  { fill: 'rgba(174,190,164,', edge: 'rgba(140,159,131,', width: 0.7, leaf: true, weight: 1 },
]

const bag = kinds.flatMap((kind, index) => Array.from({ length: kind.weight }, () => index))
const random = (min: number, max: number) => min + Math.random() * (max - min)

export const PetalCanvas = forwardRef<PetalController, PetalCanvasProps>(function PetalCanvas(
  { isFront },
  forwardedRef,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controllerRef = useRef<PetalController>({
    start: () => undefined,
    stop: () => undefined,
    boost: () => undefined,
    burst: () => undefined,
    setBase: () => undefined,
    reduced: false,
  })

  useImperativeHandle(forwardedRef, () => controllerRef.current, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1
    let petals: Petal[] = []
    const extras: Petal[] = []
    let baseCount = 0
    let running = false
    let lastTime = 0
    let frame = 0
    let resizeTimer = 0

    const makePetal = (fromTop: boolean): Petal => {
      const kindIndex = bag[Math.floor(Math.random() * bag.length)]
      const kind = kinds[kindIndex]
      const size = random(7, 15) * kind.width

      return {
        kind: kindIndex,
        x: random(-40, width + 40),
        y: fromTop ? random(-height * 0.4, -20) : random(-20, height),
        size,
        vy: random(9, 22) * (size / 12),
        vx: random(-6, 6),
        sway: random(10, 34),
        swaySpeed: random(0.22, 0.55),
        phase: random(0, Math.PI * 2),
        rotation: random(0, Math.PI * 2),
        rotationSpeed: random(-0.35, 0.35),
        flip: random(0.55, 1),
        flipSpeed: random(0.3, 0.8),
        alpha: random(0.4, 0.85),
        life: 1,
      }
    }

    const setBase = (amount: number, keep = true) => {
      baseCount = amount
      if (!keep) return
      while (petals.length < amount) petals.push(makePetal(petals.length > 0))
      if (petals.length > amount) petals = petals.slice(0, amount)
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = width < 620 ? 12 : width < 1100 ? 18 : 24
      setBase(baseCount ? Math.max(target, baseCount) : target)
    }

    const drawPetal = (petal: Petal) => {
      const kind = kinds[petal.kind]
      const size = petal.size
      const squash = Math.abs(Math.sin(petal.phase * petal.flipSpeed)) * 0.65 + 0.35
      const alpha = petal.alpha * petal.life

      context.save()
      context.translate(petal.x, petal.y)
      context.rotate(petal.rotation)
      context.scale(squash * petal.flip, 1)
      context.globalAlpha = alpha
      context.beginPath()

      if (kind.leaf) {
        context.moveTo(0, -size)
        context.quadraticCurveTo(size * 0.55, 0, 0, size)
        context.quadraticCurveTo(-size * 0.55, 0, 0, -size)
      } else {
        context.moveTo(0, -size * 0.9)
        context.bezierCurveTo(size * 0.78, -size * 0.5, size * 0.6, size * 0.72, 0, size * 0.95)
        context.bezierCurveTo(-size * 0.6, size * 0.72, -size * 0.78, -size * 0.5, 0, -size * 0.9)
      }

      context.closePath()
      context.fillStyle = `${kind.fill}0.9)`
      context.fill()
      context.globalAlpha = alpha * 0.55
      context.strokeStyle = `${kind.edge}0.9)`
      context.lineWidth = 0.7
      context.stroke()

      if (kind.leaf) {
        context.beginPath()
        context.moveTo(0, -size * 0.85)
        context.lineTo(0, size * 0.85)
        context.stroke()
      }

      context.restore()
    }

    const step = (petal: Petal, delta: number) => {
      petal.phase += delta * petal.swaySpeed
      petal.rotation += delta * petal.rotationSpeed
      petal.y += petal.vy * delta
      petal.x += (petal.vx + Math.sin(petal.phase) * petal.sway) * delta
    }

    const loop = (time: number) => {
      if (!running) return

      const delta = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      context.clearRect(0, 0, width, height)

      petals.forEach((petal, index) => {
        step(petal, delta)
        if (petal.y - petal.size > height + 30 || petal.x < -90 || petal.x > width + 90) {
          petals[index] = makePetal(true)
        } else {
          drawPetal(petal)
        }
      })

      for (let index = extras.length - 1; index >= 0; index -= 1) {
        const petal = extras[index]
        step(petal, delta)
        if (petal.fade) petal.life -= delta * petal.fade
        if (
          petal.life <= 0
          || petal.y - petal.size > height + 30
          || petal.x < -110
          || petal.x > width + 110
        ) {
          extras.splice(index, 1)
        } else {
          drawPetal(petal)
        }
      }

      frame = window.requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      lastTime = performance.now()
      frame = window.requestAnimationFrame(loop)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(frame)
    }

    const boost = (amount = 10, duration = 9000) => {
      if (reduced || extras.length > 90) return
      for (let index = 0; index < amount; index += 1) {
        const petal = makePetal(true)
        petal.y = random(-height * 0.7, -10)
        petal.fade = 1 / (duration / 1000 + 6)
        extras.push(petal)
      }
    }

    const burst = (x: number, y: number, amount = 18) => {
      if (reduced) return
      for (let index = 0; index < amount; index += 1) {
        const petal = makePetal(false)
        petal.x = x + random(-60, 60)
        petal.y = y + random(-40, 40)
        petal.vy = random(14, 40)
        petal.vx = random(-55, 55)
        petal.sway = random(16, 44)
        petal.alpha = random(0.55, 0.95)
        petal.fade = 0.085
        extras.push(petal)
      }
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 180)
    }

    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else if (document.documentElement.classList.contains('is-entered')) start()
    }

    resize()
    controllerRef.current.start = start
    controllerRef.current.stop = stop
    controllerRef.current.boost = boost
    controllerRef.current.burst = burst
    controllerRef.current.setBase = (amount) => setBase(amount)
    controllerRef.current.reduced = reduced
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      stop()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return <canvas ref={canvasRef} id="petal-canvas" className={isFront ? 'is-front' : ''} aria-hidden="true" />
})
