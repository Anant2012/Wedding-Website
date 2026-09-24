import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Motif } from './Motif'

gsap.registerPlugin(useGSAP)

type OpeningInvitationProps = {
  onEntered: () => void
  onComplete: () => void
}

export function OpeningInvitation({ onEntered, onComplete }: OpeningInvitationProps) {
  const gateRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const openedRef = useRef(false)
  const [opening, setOpening] = useState(false)
  const callbacksRef = useRef({ onEntered, onComplete })
  callbacksRef.current = { onEntered, onComplete }

  useGSAP(() => {
    const gate = gateRef.current
    if (!gate) return

    const select = gsap.utils.selector(gate)
    const object = select('.opening__object')
    const flap = select('.opening__flap')
    const flapShade = select('.opening__flap-shadow')
    const seal = select('.opening__seal')
    const card = select('.opening__card')
    const cover = select('.opening__cover')
    const cardShade = select('.opening__card-shade')
    const timeline = gsap.timeline({ paused: true })

    // The card never changes opacity or stacking order: the pocket conceals it.
    timeline
      .addLabel('touch', 0)
      .to(object, { scale: 0.996, duration: 0.16, ease: 'power2.out' }, 'touch')
      .to(seal, { scale: 0.94, rotation: -3, duration: 0.16, ease: 'power2.out' }, 'touch')
      .to('.opening__cue, .opening__heading', { opacity: 0, duration: 0.3 }, 'touch')
      .addLabel('release', 0.18)
      .to(object, { scale: 1, duration: 0.36, ease: 'sine.inOut' }, 'release')
      .to(seal, {
        scale: 1, rotationY: -18, rotation: -8, z: 8,
        boxShadow: '3px 7px 9px rgba(69, 43, 29, .23)',
        duration: 0.26, ease: 'sine.inOut',
      }, 'release')
      .to(seal, {
        xPercent: 116, yPercent: 119, rotation: 19, rotationY: 0, z: 1,
        duration: 0.42, ease: 'power2.in',
      }, 0.44)
      .to(seal, {
        xPercent: 122, yPercent: 125, rotation: 22,
        boxShadow: '1px 2px 2px rgba(69, 43, 29, .25)',
        duration: 0.18, ease: 'power2.out',
      }, 0.86)
      .addLabel('flap', 0.72)
      .to(flap, { rotationX: 28, duration: 0.32, ease: 'sine.in' }, 'flap')
      .to(flapShade, { scaleY: 0.83, opacity: 0.22, duration: 0.32 }, 'flap')
      .to(flap, { rotationX: 90, duration: 0.4, ease: 'sine.inOut' }, 1.04)
      .to(flapShade, { scaleY: 0.06, opacity: 0, duration: 0.4 }, 1.04)
      // Change the overlap only when the real, two-sided flap crosses its hinge.
      .set(flap, { zIndex: 2 }, 1.44)
      .to(flap, { rotationX: 174, duration: 0.58, ease: 'power2.out' }, 1.44)
      .to(flap, { '--flap-light': 0.06, duration: 1.3, ease: 'sine.inOut' }, 'flap')
      .addLabel('draw', 1.96)
      .to(card, { yPercent: -12, duration: 0.46, ease: 'sine.in' }, 'draw')
      .to(card, { yPercent: -55, duration: 1.02, ease: 'sine.inOut' }, 2.42)
      .to(object, { yPercent: 24, rotation: 0, duration: 1.48, ease: 'sine.inOut' }, 'draw')
      .to(card, {
        boxShadow: '0 1px 0 #bfa88d, 0 3px 0 #e2d4bd, 0 7px 12px rgba(67, 39, 33, .12)',
        duration: 1.48, ease: 'sine.inOut',
      }, 'draw')
      .addLabel('unfold', 3.64)
      .to(cover, { rotationX: 32, duration: 0.38, ease: 'sine.in' }, 'unfold')
      .to(cover, { rotationX: 90, duration: 0.42, ease: 'sine.inOut' }, 4.02)
      .to(cover, { rotationX: 174, duration: 0.68, ease: 'power2.out' }, 4.44)
      .to(cardShade, { opacity: 0.19, scaleY: 0.58, duration: 0.8, ease: 'sine.inOut' }, 'unfold')
      .to(cardShade, { opacity: 0, scaleY: 0.02, duration: 0.68, ease: 'power2.out' }, 4.44)
      .to(cover, { '--fold-shade': 0, duration: 1.48, ease: 'sine.inOut' }, 'unfold')
      .to('.opening__light', { opacity: 0.65, duration: 1.5, ease: 'sine.inOut' }, 'unfold')
      .addLabel('read', 5.12)
      .addLabel('arrival', 5.85)
      .call(() => callbacksRef.current.onEntered(), [], 'arrival')
      .to(gate, { opacity: 0, duration: 0.85, ease: 'sine.inOut' }, 'arrival')
      .addLabel('complete', 6.7)
      .call(() => callbacksRef.current.onComplete(), [], 'complete')

    timelineRef.current = timeline
    triggerRef.current?.focus({ preventScroll: true })

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onPreferenceChange = () => {
      if (preference.matches && openedRef.current) timeline.seek('complete', false)
    }
    preference.addEventListener('change', onPreferenceChange)
    return () => {
      preference.removeEventListener('change', onPreferenceChange)
      timeline.kill()
      timelineRef.current = null
    }
  }, { scope: gateRef })

  const openInvitation = () => {
    const timeline = timelineRef.current
    if (!timeline || openedRef.current) return

    openedRef.current = true
    setOpening(true)
    document.dispatchEvent(new CustomEvent('invite:opened'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timeline.seek('complete', false)
    } else {
      timeline.play(0)
    }
  }

  return (
    <div
      ref={gateRef}
      id="gate"
      className="opening"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
      aria-describedby="opening-summary"
    >
      <p id="opening-summary" className="sr-only">
        Anjali and Rushabh invite you to their wedding in Gwalior.
        Tap the envelope or press Enter to open your invitation.
      </p>
      <div className="opening__light" aria-hidden="true" />
      <div className="opening__scene">
        <header className="opening__heading" aria-hidden="true">
          <p>A sacred beginning</p>
          <h2>Anjali <em>&amp;</em> Rushabh</h2>
        </header>

        <div className="opening__object" aria-hidden="true">
          <div className="opening__back opening__paper" />
          <div className="opening__lining opening__paper">
            <Motif id="m-jali" />
          </div>

          <div className="opening__card">
            <div className="opening__card-inner opening__paper">
              <span className="opening__printed-rule" />
              <p className="opening__card-kicker">The wedding celebration of</p>
              <p className="opening__card-names">Anjali <em>&amp;</em> Rushabh</p>
              <Motif className="opening__divider" id="m-divider" />
              <p className="opening__card-date">A sacred beginning</p>
              <p className="opening__card-place">Gwalior</p>
            </div>
            <div className="opening__card-shade" />
            <div className="opening__cover">
              <div className="opening__cover-front opening__paper">
                <span className="opening__printed-rule" />
                <Motif className="opening__cover-botanical" id="m-spray" />
                <p className="opening__card-kicker">With love, an invitation</p>
                <span className="opening__monogram">A<em>&amp;</em>R</span>
                <p className="opening__cover-note">A celebration of a lifetime</p>
              </div>
              <div className="opening__cover-back opening__paper">
                <span className="opening__printed-rule" />
                <Motif className="opening__lotus" id="m-lotus" />
                <p className="devanagari opening__blessing">॥ श्री गणेशाय नमः ॥</p>
                <p className="opening__family">Together with our families,<br />we invite you to share<br />in our beautiful beginning.</p>
                <Motif className="opening__divider" id="m-sprig" />
              </div>
            </div>
            <div className="opening__crease" />
          </div>

          <div className="opening__pocket">
            <div className="opening__wing opening__wing--left opening__paper" />
            <div className="opening__wing opening__wing--right opening__paper" />
            <div className="opening__pocket-front opening__paper">
              <span className="opening__envelope-inscription">Especially for you</span>
            </div>
            <Motif className="opening__emboss opening__emboss--left" id="m-cluster" />
            <Motif className="opening__emboss opening__emboss--right" id="m-cluster" />
            <svg className="opening__seams" viewBox="0 0 320 220" preserveAspectRatio="none">
              <path d="M1 1 160 94 319 1M1 219 120 119M319 219 200 119" />
            </svg>
          </div>
          <div className="opening__flap-shadow" />
          <div className="opening__flap">
            <div className="opening__flap-front opening__paper">
              <Motif className="opening__flap-emboss" id="m-spray" />
              <svg className="opening__flap-rule" viewBox="0 0 320 124" preserveAspectRatio="none">
                <path d="M8 5 155 116Q160 120 165 116L312 5" />
              </svg>
            </div>
            <div className="opening__flap-back opening__paper">
              <Motif id="m-jali" />
            </div>
          </div>
          <div className="opening__hinge" />
          <div className="opening__seal">
            <span className="opening__seal-rim" />
            <Motif className="opening__seal-wreath" id="m-wreath" />
            <span className="opening__seal-monogram">A<em>&amp;</em>R</span>
          </div>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="opening__trigger"
          aria-label="Open the invitation"
          aria-disabled={opening}
          onClick={openInvitation}
          onKeyDown={(event) => {
            if (event.key === 'Tab') event.preventDefault()
          }}
        >
          <span className="opening__cue" aria-hidden="true">
            <span className="opening__cue-line" />
            <span>Tap to open</span>
            <span className="opening__cue-note">A little love, sealed just for you</span>
          </span>
        </button>
      </div>
      <p className="opening__edition" aria-hidden="true">With love <span /> Gwalior</p>
      <p className="sr-only" role="status">{opening ? 'Opening your invitation.' : ''}</p>
    </div>
  )
}
