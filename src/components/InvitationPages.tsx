import { useRef, type RefObject } from 'react'
import { useCelebrationScenes } from '../hooks/useInvitationScenes'
import { Countdown } from './Countdown'
import { CourtyardArt, FloralSpray, FortPanorama, HeritageEngraving, LotusGarden, MandapArt, PaperPattern } from './HeritageArt'
import { Motif } from './Motif'
import type { PetalController } from './PetalCanvas'
import { ScratchReveal } from './ScratchReveal'

type InvitationPagesProps = {
  petalsRef: RefObject<PetalController | null>
  dateRevealed: boolean
  onDateReveal: () => void
}

function CeremonyDetails({ evening = false }: { evening?: boolean }) {
  return (
    <div className="ceremony-details">
      <p className="ceremony-details__date"><time dateTime="2026-12-02">02 December 2026</time></p>
      <p className="ceremony-details__time">{evening ? '7:00 PM onwards' : '11:00 AM'}</p>
      <p className="ceremony-details__venue">Hotel Jageshwari Inn</p>
      <p className="ceremony-details__address">Airport Road, Gwalior</p>
    </div>
  )
}

export function PageFrame() {
  return (
    <div className="pageframe" id="pageframe" aria-hidden="true">
      <Motif className="pageframe__c pageframe__c--bl" id="m-corner" />
      <Motif className="pageframe__c pageframe__c--br" id="m-corner" />
    </div>
  )
}

export function InvitationPages({ petalsRef, dateRevealed, onDateReveal }: InvitationPagesProps) {
  return (
    <main id="main" className={`journey${dateRevealed ? ' journey--revealed' : ''}`}>
      <section className="chapter chapter--overture" id="home" aria-labelledby="overture-title" data-intro>
        <PaperPattern className="overture__inlay" variant="jali" />
        <div className="overture__inner">
          <p className="devanagari overture__blessing">॥ श्री गणेशाय नमः ॥</p>
          <p className="journey-kicker">The wedding celebration of</p>
          <h1 className="overture__names" id="overture-title">
            <span>Anjali</span><em>&amp;</em><span>Rushabh</span>
          </h1>
          <div className="overture__imprint">
            <p>Gwalior</p>
          </div>
        </div>
        <div className="overture__horizon" aria-hidden="true" data-depth="-32">
          <FortPanorama />
        </div>
        <FloralSpray className="overture__flower" variant="jasmine" />
        <a className="overture__continue" href="#couple" aria-label="Scroll to discover the families">
          <span>Scroll to discover</span>
          <svg className="overture__indicator" viewBox="0 0 20 42" aria-hidden="true" focusable="false">
            <path d="M10 2V34M5 29L10 35L15 29" />
          </svg>
        </a>
      </section>

      <section className="chapter chapter--families" id="couple" aria-labelledby="families-title" data-intro>
        <div className="journey-wrap">
          <header className="families__heading" data-reveal>
            <h2 className="journey-title" id="families-title">Our <em>families.</em></h2>
          </header>
          <div className="family-spread">
            <article className="family family--bride" data-family="bride">
              <FloralSpray className="family__flowers" variant="jasmine" />
              <div className="family__copy">
                <p className="family__annotation">the bride</p>
                <h3 className="family__name">Anjali <span>Singh</span></h3>
                <p className="family__relationship">Daughter of</p>
                <p className="family__parents">Mr. Satyendra Singh<br />&amp; Mrs. Reena Singh</p>
              </div>
            </article>
            <div className="family-union">
              <span className="family-union__thread" aria-hidden="true" />
              <span className="family-union__om devanagari" aria-hidden="true">ॐ</span>
              <span className="family-union__thread" aria-hidden="true" />
            </div>
            <article className="family family--groom" data-family="groom">
              <FloralSpray className="family__flowers" variant="marigold" />
              <div className="family__copy">
                <p className="family__annotation">the groom</p>
                <h3 className="family__name">Rushabh <span>Singh</span></h3>
                <p className="family__relationship">Son of</p>
                <p className="family__parents">Mr. Indresh Singh<br />&amp; Mrs. Rekha Singh</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="chapter chapter--heritage" id="heritage" aria-labelledby="heritage-title" data-intro>
        <div className="heritage__sun" aria-hidden="true" />
        <HeritageEngraving className="heritage__engraving" />
        <PaperPattern className="heritage__inlay heritage__inlay--left" variant="jali" />
        <PaperPattern className="heritage__inlay heritage__inlay--right" variant="jali" />
        <header className="heritage__heading journey-wrap">
          <h2 id="heritage-title">Gwalior</h2>
        </header>
        <figure className="heritage__panorama">
          <FortPanorama className="heritage__fort" engraved />
          <figcaption>
            Gwalior Fort &amp; Man Mandir
            <Motif className="heritage__caption-rule" id="m-divider" />
          </figcaption>
        </figure>
      </section>

      <section className="chapter chapter--keepsake" id="reveal" aria-labelledby="keepsake-title" data-intro>
        <div className="journey-wrap keepsake-layout">
          <header className="keepsake__copy" data-reveal>
            <h2 className="journey-title" id="keepsake-title">
              {dateRevealed ? <>This is<br /><em>the day.</em></> : <>A little secret<br /><em>awaits&hellip;</em></>}
            </h2>
          </header>
          <div className="keepsake">
            <ScratchReveal petalsRef={petalsRef} revealed={dateRevealed} onReveal={onDateReveal}>
              <div className="secret__release">
                <a className="journey-link" href="#countdown">Discover the celebrations <span aria-hidden="true">&darr;</span></a>
              </div>
            </ScratchReveal>
          </div>
        </div>
      </section>

      {dateRevealed && <CelebrationChapters petalsRef={petalsRef} />}
    </main>
  )
}

function CelebrationChapters({ petalsRef }: Pick<InvitationPagesProps, 'petalsRef'>) {
  const scopeRef = useRef<HTMLDivElement>(null)
  useCelebrationScenes(scopeRef, petalsRef)

  return (
    <div className="unlocked-journey" ref={scopeRef}>
      <section className="chapter chapter--calendar" id="countdown" aria-labelledby="calendar-title">
        <div className="journey-wrap calendar-layout">
          <header className="calendar__heading" data-reveal>
            <h2 className="journey-title" id="calendar-title">Until we<br /><em>celebrate.</em></h2>
          </header>
          <div className="calendar__keepsake" data-reveal>
            <Countdown />
            <a className="journey-link calendar__save" href="anjali-rushabh-wedding.ics" download>
              Keep the date <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="celebration-suite" id="celebrations" aria-label="Celebrations">
        <article className="ceremony ceremony--haldi" id="haldi" aria-labelledby="haldi-title">
          <div className="haldi__sunwash" aria-hidden="true" />
          <FloralSpray className="haldi__flowers haldi__flowers--near" variant="marigold" />
          <FloralSpray className="haldi__flowers haldi__flowers--far" variant="marigold" />
          <div className="ceremony__copy journey-wrap">
            <h2 className="ceremony__title" id="haldi-title">Haldi</h2>
            <CeremonyDetails />
          </div>
        </article>

        <article className="ceremony ceremony--sangeet" id="sangeet" aria-labelledby="sangeet-title">
          <div className="ceremony__copy journey-wrap">
            <h2 className="ceremony__title" id="sangeet-title">Sangeet</h2>
            <CeremonyDetails evening />
          </div>
          <div className="sangeet__courtyard">
            <CourtyardArt />
          </div>
        </article>
      </section>

      <section className="chapter chapter--vows" id="wedding" aria-labelledby="wedding-title">
        <div className="vows__ceremony">
          <header className="vows__heading journey-wrap">
            <p className="devanagari vows__blessing">॥ शुभ विवाह ॥</p>
            <h2 id="wedding-title" data-vow-copy>The Wedding</h2>
            <p className="vows__date" data-vow-copy><time dateTime="2026-12-03">Thursday, 3 December 2026</time></p>
          </header>
          <div className="vows__stage"><MandapArt /></div>
          <div className="vows__invitation journey-wrap" data-reveal>
            <p className="vows__promise">Seven steps.<br /><em>A lifetime, together.</em></p>
            <p className="vows__venue">Abhinanadan Vatika</p>
            <p className="vows__address">Airport Road, Gwalior</p>
            <a className="journey-link" href="#venue">Find your way <span aria-hidden="true">&darr;</span></a>
          </div>
        </div>
      </section>

      <section className="chapter chapter--locations" id="venue" aria-labelledby="locations-title">
        <header className="journey-wrap locations__heading" data-reveal>
          <h2 className="journey-title" id="locations-title">Directions</h2>
        </header>
        <div className="location-list journey-wrap">
          <article className="location-entry" data-reveal>
            <span className="location-entry__number" aria-hidden="true">01</span>
            <div>
              <p className="journey-kicker">Haldi &amp; Sangeet</p>
              <h3>Hotel Jageshwari Inn</h3>
              <p className="location-entry__address">Airport Road, Gwalior</p>
              <a className="journey-link journey-link--directions"
                href="https://www.google.com/maps/search/?api=1&query=Hotel%20Jageshwari%20Inn%2C%20Airport%20Road%2C%20Gwalior"
                target="_blank" rel="noopener noreferrer" aria-label="Get directions to Hotel Jageshwari Inn (opens Google Maps)">
                Get directions <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </article>
          <article className="location-entry" data-reveal>
            <span className="location-entry__number" aria-hidden="true">02</span>
            <div>
              <p className="journey-kicker">The wedding</p>
              <h3>Abhinanadan Vatika</h3>
              <p className="location-entry__address">Airport Road, Gwalior</p>
              <a className="journey-link journey-link--directions"
                href="https://www.google.com/maps/search/?api=1&query=Abhinandan%20Vatika%2C%20Airport%20Road%2C%20Gwalior"
                target="_blank" rel="noopener noreferrer" aria-label="Get directions to Abhinanadan Vatika (opens Google Maps)">
                Get directions <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="chapter chapter--closing" id="blessing" aria-labelledby="closing-title" data-petals="4">
        <div className="closing__watermark" aria-hidden="true">A<em>&amp;</em>R</div>
        <div className="journey-wrap closing__copy">
          <p className="closing__salutation" data-reveal>With love,</p>
          <h2 id="closing-title" data-reveal>Anjali <em>&amp;</em> Rushabh</h2>
          <Motif className="closing__diya" id="m-diya" />
          <p className="devanagari closing__blessing" data-reveal>॥ शुभ मंगल ॥</p>
        </div>
        <div className="closing__garden" aria-hidden="true">
          <LotusGarden />
        </div>
        <footer className="journey-footer">
          <a href="#home">Back to the beginning <span aria-hidden="true">&uarr;</span></a>
        </footer>
      </section>
    </div>
  )
}
