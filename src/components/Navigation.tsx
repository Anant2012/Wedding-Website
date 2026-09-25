import { useCallback, useEffect, useRef, useState } from 'react'
import { Motif } from './Motif'

type NavigationProps = {
  entered: boolean
  dateRevealed: boolean
}

const secretLinks = [
  { href: '#home', label: 'Home' },
  { href: '#couple', label: 'The Families' },
  { href: '#heritage', label: 'Gwalior' },
  { href: '#reveal', label: 'The Secret' },
]

const celebrationLinks = [
  { href: '#home', label: 'Home' },
  { href: '#couple', label: 'The Families' },
  { href: '#reveal', label: 'Our Date' },
  { href: '#celebrations', label: 'Celebrations' },
  { href: '#wedding', label: 'The Wedding' },
  { href: '#venue', label: 'Directions' },
]

function scrollToSection(href: string) {
  const section = document.querySelector<HTMLElement>(href)
  if (!section) return

  const nav = document.getElementById('nav')
  const navHeight = nav && getComputedStyle(nav).position === 'fixed' ? nav.offsetHeight : 0
  const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 12
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: Math.max(top, 0), behavior: reduced ? 'auto' : 'smooth' })
}

export function Navigation({ entered, dateRevealed }: NavigationProps) {
  const links = dateRevealed ? celebrationLinks : secretLinks
  const [isStuck, setIsStuck] = useState(false)
  const [sheetMounted, setSheetMounted] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')
  const closeTimerRef = useRef(0)
  const openFrameRef = useRef(0)
  const navigationRef = useRef<HTMLDivElement>(null)
  const pendingHrefRef = useRef<string | null>(null)

  const closeSheet = useCallback(() => {
    window.cancelAnimationFrame(openFrameRef.current)
    window.clearTimeout(closeTimerRef.current)
    setSheetOpen(false)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    closeTimerRef.current = window.setTimeout(() => setSheetMounted(false), reduced ? 0 : 550)
  }, [])

  useEffect(() => {
    const onScroll = () => setIsStuck(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [links])

  useEffect(() => {
    if (!sheetMounted) return
    const navigation = navigationRef.current
    const sheet = navigation?.querySelector<HTMLElement>('#nav-sheet')
    if (!navigation || !sheet) return

    const background = [...document.querySelectorAll<HTMLElement>('#main, #music-btn')]
      .map((element) => ({ element, inert: element.inert }))
    const root = document.documentElement
    const overflow = { root: root.style.overflow, body: document.body.style.overflow, gutter: root.style.scrollbarGutter }
    root.style.scrollbarGutter = 'stable'
    root.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    background.forEach(({ element }) => { element.inert = true })
    sheet.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeSheet()
      } else if (event.key === 'Tab') {
        const controls = [...navigation.querySelectorAll<HTMLElement>('a[href], button')]
          .filter((element) => element.getClientRects().length > 0)
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !navigation.contains(event.target)) {
        sheet.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
      root.style.overflow = overflow.root
      root.style.scrollbarGutter = overflow.gutter
      document.body.style.overflow = overflow.body
      background.forEach(({ element, inert }) => { element.inert = inert })
      const href = pendingHrefRef.current
      pendingHrefRef.current = null
      if (href) {
        scrollToSection(href)
        const heading = document.querySelector<HTMLElement>(`${href} h1, ${href} h2`)
        heading?.setAttribute('tabindex', '-1')
        heading?.focus({ preventScroll: true })
      } else if (navigation.isConnected) {
        navigation.querySelector<HTMLButtonElement>('#nav-toggle')?.focus({ preventScroll: true })
      }
    }
  }, [sheetMounted, closeSheet])

  useEffect(() => () => {
    window.clearTimeout(closeTimerRef.current)
    window.cancelAnimationFrame(openFrameRef.current)
  }, [])

  const openSheet = () => {
    window.clearTimeout(closeTimerRef.current)
    pendingHrefRef.current = null
    setSheetMounted(true)
    openFrameRef.current = window.requestAnimationFrame(() => setSheetOpen(true))
  }

  const followLink = (href: string) => {
    if (sheetMounted) {
      pendingHrefRef.current = href
      closeSheet()
    } else {
      scrollToSection(href)
    }
  }

  return (
    <div
      ref={navigationRef}
      role={sheetMounted ? 'dialog' : undefined}
      aria-modal={sheetMounted ? true : undefined}
      aria-label={sheetMounted ? 'Invitation chapters' : undefined}
    >
      <header id="nav" className={`nav${entered ? ' is-live' : ''}${isStuck ? ' is-stuck' : ''}`}>
        <a
          className="nav__mark"
          href="#home"
          aria-label="Anjali and Rushabh — home"
          onClick={(event) => {
            event.preventDefault()
            followLink('#home')
          }}
        >
          <span>A</span><em>&amp;</em><span>R</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={activeHref === href ? 'is-active' : ''}
              onClick={(event) => {
                event.preventDefault()
                followLink(href)
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="nav__toggle"
          id="nav-toggle"
          aria-expanded={sheetOpen}
          aria-controls="nav-sheet"
          aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
          onClick={() => (sheetOpen ? closeSheet() : openSheet())}
        >
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
      </header>

      {sheetMounted && (
        <div className={`sheet${sheetOpen ? ' is-open' : ''}`} id="nav-sheet">
          <Motif className="sheet__corner sheet__corner--tl" id="m-corner" />
          <Motif className="sheet__corner sheet__corner--br" id="m-corner" />
          <nav className="sheet__nav" aria-label="Menu">
            {links.map(({ href, label }, index) => (
              <a
                key={href}
                href={href}
                onClick={(event) => {
                  event.preventDefault()
                  followLink(href)
                }}
              >
                <i>{String(index + 1).padStart(2, '0')}</i>{label}
              </a>
            ))}
          </nav>
          <Motif className="motif motif--sprig sheet__sprig" id="m-sprig" />
          <p className="sheet__names">Anjali &amp; Rushabh</p>
        </div>
      )}
    </div>
  )
}
