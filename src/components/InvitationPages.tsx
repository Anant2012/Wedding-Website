import { useRef, type RefObject } from 'react'
import { useCelebrationScenes } from '../hooks/useInvitationScenes'
import { Countdown } from './Countdown'
import { CourtyardArt, FloralSpray, FortPanorama, LotusGarden, MandapArt, PaperPattern, RouteArt } from './HeritageArt'
import { Motif } from './Motif'
import type { PetalController } from './PetalCanvas'
import { ScratchReveal } from './ScratchReveal'

type InvitationPagesProps = {
  petalsRef: RefObject<PetalController | null>
  dateRevealed: boolean
  onDateReveal: () => void
}

function Folio({ number, children }: { number: string; children: string }) {
  return <p className="journey-folio"><span>{number}</span>{children}</p>
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
          <Folio number="01">A sacred beginning</Folio>
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
          <Folio number="02">The families</Folio>
          <header className="families__heading" data-reveal>
            <h2 className="journey-title" id="families-title">Two families.<br /><em>One beautiful<br className="mobile-break" /> beginning.</em></h2>
            <p className="journey-note">Two hearts, held by a lifetime of love.</p>
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
          <p className="families__signature" data-reveal>Anjali <em>&amp;</em> Rushabh</p>
        </div>
      </section>

      <section className="chapter chapter--heritage" id="heritage" aria-labelledby="heritage-title" data-intro>
        <div className="heritage__sun" aria-hidden="true" />
        <header className="heritage__heading journey-wrap">
          <Folio number="03">From Gwalior, with love</Folio>
          <h2 id="heritage-title">Gwalior</h2>
          <p>Where heritage meets<br /><em>a new beginning.</em></p>
        </header>
        <figure className="heritage__panorama">
          <FortPanorama className="heritage__fort" />
          <figcaption>Gwalior Fort &amp; Man Mandir<br /><span>An illustrated homage to the city we celebrate in</span></figcaption>
        </figure>
        <p className="heritage__postscript">Old walls. New promises.</p>
      </section>

      <section className="chapter chapter--keepsake" id="reveal" aria-labelledby="keepsake-title" data-intro>
        <div className="journey-wrap keepsake-layout">
          <header className="keepsake__copy" data-reveal>
            <Folio number="04">{dateRevealed ? 'A promise revealed' : 'Beneath the gold'}</Folio>
            <h2 className="journey-title" id="keepsake-title">
              {dateRevealed ? <>This is<br /><em>the day.</em></> : <>A little secret<br /><em>awaits&hellip;</em></>}
            </h2>
            <p className="journey-note">
              {dateRevealed ? <>Our forever has a day.<br />And you are part of it.</> : <>Scratch to reveal the day<br />our forever begins.</>}
            </p>
          </header>
          <div className="keepsake__paper">
            <PaperPattern className="keepsake__lining" />
            <span className="keepsake__edition" aria-hidden="true">A &amp; R / a beautiful beginning</span>
            <ScratchReveal petalsRef={petalsRef} revealed={dateRevealed} onReveal={onDateReveal} />
          </div>
        </div>
        {dateRevealed && (
          <div className="secret__release journey-wrap">
            <p className="secret__message">Now, our celebration begins.</p>
            <a className="journey-link" href="#countdown">Step into the celebration <span aria-hidden="true">&darr;</span></a>
          </div>
        )}
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
            <Folio number="05">Until our forever</Folio>
            <h2 className="journey-title" id="calendar-title">Some days<br /><em>are for always.</em></h2>
            <p className="journey-note">This is ours.</p>
          </header>
          <div className="calendar__keepsake" data-reveal>
            <div className="calendar-leaf">
              <span className="calendar-leaf__pin" aria-hidden="true" />
              <p className="calendar-leaf__weekday">Thursday</p>
              <time className="calendar-leaf__date" dateTime="2026-12-03">
                <span className="calendar-leaf__day">03</span>
                <span className="calendar-leaf__month">December</span>
                <span className="calendar-leaf__year">2026</span>
              </time>
              <Motif className="calendar-leaf__lotus" id="m-lotus" />
            </div>
            <Countdown />
            <a className="journey-link calendar__save" href="anjali-rushabh-wedding.ics" download>
              Keep the date <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="chapter chapter--letter" id="invitation" aria-labelledby="letter-title">
        <div className="journey-wrap letter-layout">
          <div className="letter__margin" data-reveal>
            <Folio number="06">A note from our hearts</Folio>
            <p>For the people<br />who make our world<br /><em>more beautiful.</em></p>
          </div>
          <div className="letter-object">
            <PaperPattern className="letter-object__lining" />
            <article className="heart-letter" data-reveal>
              <div className="heart-letter__vellum" aria-hidden="true" data-vellum />
              <FloralSpray className="heart-letter__botanical" variant="jasmine" />
              <div className="heart-letter__copy">
                <p className="devanagari heart-letter__blessing">॥ वक्रतुण्ड महाकाय ॥</p>
                <h2 className="journey-kicker" id="letter-title">The invitation</h2>
                <p className="heart-letter__text">
                  With the blessings of our elders<br />
                  and the love of our families,<br />
                  we invite you to be a part of<br />
                  <em>our beautiful beginning.</em>
                </p>
                <p className="heart-letter__signature">Anjali &amp; Rushabh</p>
                <span className="heart-letter__crest" aria-hidden="true">A<em>&amp;</em>R</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="celebration-suite" id="celebrations" aria-labelledby="celebrations-title">
        <header className="celebration-suite__heading journey-wrap" data-reveal>
          <p className="journey-kicker">02 &amp; 03 December 2026</p>
          <h2 className="journey-title" id="celebrations-title">Days made for <em>joy.</em></h2>
          <p className="journey-note">From the first golden morning to the sacred vows.</p>
        </header>

        <article className="ceremony ceremony--haldi" id="haldi" aria-labelledby="haldi-title">
          <div className="haldi__sunwash" aria-hidden="true" />
          <FloralSpray className="haldi__flowers haldi__flowers--near" variant="marigold" />
          <FloralSpray className="haldi__flowers haldi__flowers--far" variant="marigold" />
          <div className="ceremony__copy journey-wrap">
            <Folio number="07">A morning in bloom</Folio>
            <p className="ceremony__annotation">sunlight, laughter &amp; a little haldi</p>
            <h3 className="ceremony__title" id="haldi-title">Haldi</h3>
            <p className="ceremony__story">Turmeric, blessings and laughter<br />before the vows.</p>
            <CeremonyDetails />
          </div>
          <p className="ceremony__footnote">Let the celebrations begin.</p>
        </article>

        <article className="ceremony ceremony--sangeet" id="sangeet" aria-labelledby="sangeet-title">
          <div className="ceremony__copy journey-wrap">
            <Folio number="08">An evening in rhythm</Folio>
            <h3 className="ceremony__title" id="sangeet-title">Sangeet</h3>
            <p className="ceremony__story">An evening of music, dance<br />and the people we love.</p>
            <CeremonyDetails evening />
          </div>
          <div className="sangeet__courtyard">
            <CourtyardArt />
            <p className="sangeet__inscription">a little music, a thousand memories</p>
          </div>
        </article>
      </section>

      <section className="chapter chapter--vows" id="wedding" aria-labelledby="wedding-title">
        <div className="vows__prelude" data-reveal>
          <span aria-hidden="true">II</span><p>The next day,<br /><em>our forever begins.</em></p>
        </div>
        <div className="vows__ceremony">
          <header className="vows__heading journey-wrap">
            <Folio number="09">Before fire &amp; family</Folio>
            <p className="devanagari vows__blessing">॥ शुभ विवाह ॥</p>
            <h2 id="wedding-title" data-vow-copy>The Wedding</h2>
            <p className="vows__date" data-vow-copy><time dateTime="2026-12-03">Thursday, 3 December 2026</time></p>
          </header>
          <div className="vows__stage"><MandapArt /></div>
          <div className="vows__invitation journey-wrap" data-reveal>
            <p className="vows__promise">Seven steps.<br /><em>A lifetime, together.</em></p>
            <p className="vows__venue">Abhinanadan Vatika</p>
            <p className="vows__address">Airport Road, Gwalior</p>
            <p className="vows__note">The sacred vows, taken before fire and family.</p>
            <a className="journey-link" href="#venue">Find your way <span aria-hidden="true">&darr;</span></a>
          </div>
        </div>
      </section>

      <section className="chapter chapter--locations" id="venue" aria-labelledby="locations-title">
        <header className="journey-wrap locations__heading" data-reveal>
          <Folio number="10">The Gwalior celebration</Folio>
          <h2 className="journey-title" id="locations-title">All roads lead<br /><em>to celebration.</em></h2>
          <p className="journey-note">Two places. A gathering of our favourite people.</p>
        </header>
        <figure className="locations__map journey-wrap">
          <RouteArt />
          <figcaption>An illustrated guide &middot; not to scale</figcaption>
        </figure>
        <div className="location-list journey-wrap">
          <article className="location-entry" data-reveal>
            <span className="location-entry__number" aria-hidden="true">01</span>
            <div>
              <p className="journey-kicker">Haldi &amp; Sangeet &middot; 02 December</p>
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
              <p className="journey-kicker">The wedding &middot; 03 December</p>
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
          <Folio number="11">Our beautiful beginning</Folio>
          <p className="closing__salutation" data-reveal>With love,</p>
          <h2 id="closing-title" data-reveal>Anjali <em>&amp;</em> Rushabh</h2>
          <p className="closing__message" data-reveal>We can&rsquo;t wait to celebrate<br />this beautiful beginning with you.</p>
          <Motif className="closing__diya" id="m-diya" />
          <p className="devanagari closing__blessing" data-reveal>॥ शुभ मंगल ॥</p>
        </div>
        <div className="closing__garden" aria-hidden="true">
          <LotusGarden />
        </div>
        <footer className="journey-footer">
          <p>Anjali &amp; Rushabh &middot; 03.12.2026 &middot; Gwalior</p>
          <a href="#home">Back to the beginning <span aria-hidden="true">&uarr;</span></a>
        </footer>
      </section>
    </div>
  )
}
