import { useEffect, type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PetalController } from '../components/PetalCanvas'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function revealCopy(elements: NodeListOf<HTMLElement>) {
  elements.forEach((element) => {
    gsap.from(element, {
      y: 16, opacity: 0, duration: 0.85, ease: 'power2.out',
      scrollTrigger: { trigger: element, start: 'top 93%', once: true },
    })
  })
}

function refreshScenes(media: gsap.MatchMedia) {
  const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
  let active = true
  void document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh() })
  return () => {
    active = false
    window.cancelAnimationFrame(frame)
    media.revert()
  }
}

export function useInvitationScenes(
  scopeRef: RefObject<HTMLElement | null>,
  petalsRef: RefObject<PetalController | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return
    const cue = scopeRef.current?.querySelector<HTMLAnchorElement>('.overture__continue')
    if (!cue) return
    const dismissCue = () => {
      if (window.scrollY < 24) return
      cue.classList.add('is-discovered')
      cue.tabIndex = -1
      window.removeEventListener('scroll', dismissCue)
    }
    window.addEventListener('scroll', dismissCue, { passive: true })
    dismissCue()
    return () => window.removeEventListener('scroll', dismissCue)
  }, [scopeRef, enabled])

  useGSAP(() => {
    const scope = scopeRef.current
    const journey = scope?.querySelector<HTMLElement>('.journey')
    if (!journey || !enabled) return

    const media = gsap.matchMedia()
    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      if (context.conditions?.reduced) {
        petalsRef.current?.stop()
        return
      }

      petalsRef.current?.setBase(2)
      const select = gsap.utils.selector(journey)
      revealCopy(journey.querySelectorAll<HTMLElement>('[data-intro] [data-reveal]'))

      journey.querySelectorAll<HTMLElement>('[data-depth]').forEach((element) => {
        gsap.to(element, {
          y: Number(element.dataset.depth), ease: 'none',
          scrollTrigger: { trigger: element.closest('.chapter'), start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
      })

      const families = journey.querySelector('.family-spread')
      gsap.from(select('[data-family="bride"]'), {
        x: -22, ease: 'none',
        scrollTrigger: { trigger: families, start: 'top 85%', end: 'center 55%', scrub: 0.7 },
      })
      gsap.from(select('[data-family="groom"]'), {
        x: 22, ease: 'none',
        scrollTrigger: { trigger: families, start: 'top 75%', end: 'bottom 75%', scrub: 0.7 },
      })
      const heritage = journey.querySelector('#heritage')
      const fort = gsap.timeline({
        scrollTrigger: { trigger: heritage, start: 'top 70%', end: 'bottom 85%', scrub: 0.6 },
      })
      fort
        .from(select('.heritage__fort [data-fort-mass]'), { opacity: 0.12, y: 17, duration: 1, ease: 'none' }, 0)
        .fromTo(select('.heritage__fort [data-fort-outline]'),
          { strokeDasharray: '1', strokeDashoffset: 1 },
          { strokeDashoffset: 0, autoRound: false, duration: 1.2, stagger: 0.035, ease: 'none' }, 0.1)
    })
    return refreshScenes(media)
  }, {
    scope: scopeRef,
    dependencies: [enabled, petalsRef],
    revertOnUpdate: true,
  })
}

export function useCelebrationScenes(
  scopeRef: RefObject<HTMLElement | null>,
  petalsRef: RefObject<PetalController | null>,
) {
  useGSAP(() => {
    const scope = scopeRef.current
    if (!scope) return
    const media = gsap.matchMedia()
    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      if (context.conditions?.reduced) {
        petalsRef.current?.stop()
        return
      }
      petalsRef.current?.setBase(6)
      const select = gsap.utils.selector(scope)
      revealCopy(scope.querySelectorAll<HTMLElement>('[data-reveal]'))
      gsap.from(select('.haldi__flowers'), {
        y: 38, rotation: 5, opacity: 0.4, stagger: 0.12, duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: '#haldi', start: 'top 75%', once: true },
      })

      gsap.from(select('[data-courtyard-layer]'), {
        y: 24, opacity: 0.2, duration: 1.4, stagger: 0.16, ease: 'power2.out',
        scrollTrigger: { trigger: '.sangeet__courtyard', start: 'top 90%', once: true },
      })
      const lights = gsap.to(select('[data-lantern-light]'), {
        opacity: 0.35, duration: 1.7, stagger: 0.15, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true,
      })
      ScrollTrigger.create({
        trigger: '#sangeet', start: 'top bottom', end: 'bottom top',
        onToggle: ({ isActive }) => { if (isActive) lights.play(); else lights.pause() },
      })

      const mandap = gsap.timeline({
        scrollTrigger: { trigger: '.vows__ceremony', start: 'top 72%', once: true },
        defaults: { ease: 'power2.out' },
      })
      mandap
        .from(select('[data-mandap="lights"]'), { opacity: 0, duration: 0.6 }, 0)
        .from(select('[data-mandap="flowers"]'), { opacity: 0, y: 18, duration: 0.9 }, 0.12)
        .from(select('[data-mandap="pillars"]'), { opacity: 0, scaleY: 0.86, transformOrigin: '50% 100%', duration: 1.05 }, 0.3)
        .from(select('[data-mandap="canopy"]'), { opacity: 0, y: -12, duration: 0.85 }, 0.6)
        .from(select('[data-mandap="garlands"]'), { opacity: 0, scaleY: 0.88, transformOrigin: '50% 0%', duration: 0.9 }, 0.85)
        .from(select('[data-mandap="lamps"]'), { opacity: 0, duration: 0.8 }, 1)
        .from(select('[data-vow-copy]'), { opacity: 0, y: 8, duration: 0.7, stagger: 0.12 }, 1.1)

      gsap.from(select('.closing__garden > svg'), {
        y: 24, opacity: 0.4, duration: 1.5, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.closing__garden', start: 'top 95%', once: true },
      })
      scope.querySelectorAll<HTMLElement>('[data-petals]').forEach((element) => {
        ScrollTrigger.create({
          trigger: element, start: 'top 65%', once: true,
          onEnter: () => petalsRef.current?.boost(Number(element.dataset.petals), 5500),
        })
      })
    })

    return refreshScenes(media)
  }, {
    scope: scopeRef,
    dependencies: [petalsRef],
    revertOnUpdate: true,
  })
}
