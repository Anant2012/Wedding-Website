import { useEffect, useRef, useState } from 'react'
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
  { href: '#heritage', label: 'Gwalior' },
  { href: '#reveal', label: 'Our Date' },
  { href: '#countdown', label: 'Until Forever' },
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

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), [])

  const openSheet = () => {
    window.clearTimeout(closeTimerRef.current)
    setSheetMounted(true)
    window.requestAnimationFrame(() => setSheetOpen(true))
  }

  const closeSheet = () => {
    setSheetOpen(false)
    closeTimerRef.current = window.setTimeout(() => setSheetMounted(false), 500)
  }

  const followLink = (href: string) => {
    closeSheet()
    scrollToSection(href)
  }

  return (
    <>
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
    </>
  )
}
