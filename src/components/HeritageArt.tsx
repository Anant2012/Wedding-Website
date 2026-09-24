import { useId } from 'react'

type ArtProps = { className?: string }
type FloralSprayProps = ArtProps & { variant?: 'jasmine' | 'marigold' | 'lotus' }

const c = {
  ivory: 'var(--ivory)',
  ivoryDeep: 'var(--ivory-deep)',
  cream: 'var(--cream)',
  blush: 'var(--blush)',
  blushDeep: 'var(--blush-deep)',
  champagne: 'var(--champagne)',
  gold: 'var(--gold)',
  goldInk: 'var(--gold-ink)',
  goldSoft: 'var(--gold-soft)',
  goldPale: 'var(--gold-pale)',
  sage: 'var(--sage-deep)',
  inkSoft: 'var(--ink-soft)',
}

const artClass = (className?: string) => `heritage-art${className ? ` ${className}` : ''}`

function ButiMark() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M48 96Q43 76 48 51M46 80Q28 79 25 64Q43 65 46 80ZM47 70Q64 67 68 52Q49 55 47 70Z" />
      <path d="M48 53C32 50 29 36 34 27Q48 30 48 49C47 33 53 24 64 24Q69 41 48 53Z" fill="currentColor" fillOpacity=".1" />
      <path d="M48 51C37 41 39 24 48 16C58 26 59 41 48 51ZM32 92Q48 104 65 92M36 96Q48 105 61 96" />
      <path d="M38 33L44 44M59 31L52 44M48 25V43M31 69L41 76M61 58L51 66" strokeWidth=".65" />
      <circle cx="48" cy="8" r="1.6" fill="currentColor" stroke="none" />
    </g>
  )
}

export function PaperPattern({ className, variant = 'buti' }: ArtProps & { variant?: 'buti' | 'jali' }) {
  const id = useId()
  return (
    <svg className={artClass(className)} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} width={variant === 'buti' ? 96 : 48} height={variant === 'buti' ? 128 : 64} patternUnits="userSpaceOnUse">
          {variant === 'buti' ? <ButiMark /> : (
            <g fill="none" stroke="currentColor" strokeWidth=".85">
              <path d="M0 0Q0 20 24 32Q48 44 48 64M48 0Q48 20 24 32Q0 44 0 64M0 0H48M0 64H48" />
              <path d="M24 22Q33 32 24 42Q15 32 24 22ZM24 27V37M19 32H29" />
            </g>
          )}
        </pattern>
      </defs>
      <rect width="600" height="800" fill={`url(#${id})`} />
    </svg>
  )
}

function Leaf({ x = 0, y = 0, rotate = 0, scale = 1, pale = false }: {
  x?: number
  y?: number
  rotate?: number
  scale?: number
  pale?: boolean
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0C-17-13-23-36-8-58C8-47 14-18 0 0Z" fill={pale ? c.champagne : c.sage} fillOpacity={pale ? 0.8 : 0.56} stroke={c.sage} strokeWidth="1.15" />
      <path d="M0-2Q-7-27-8-54M-4-18L-14-29M-6-28L3-40M-8-38L-15-44" fill="none" stroke={c.inkSoft} strokeOpacity=".43" strokeWidth=".8" />
    </g>
  )
}

function JasmineBloom({ transform }: { transform?: string }) {
  const pigment = useId()
  return (
    <g transform={transform} stroke={c.goldSoft} strokeWidth=".85" strokeLinejoin="round">
      <defs>
        <linearGradient id={pigment} x1="0" y1="0" x2=".3" y2="1">
          <stop stopColor={c.ivory} />
          <stop offset=".6" stopColor={c.ivoryDeep} />
          <stop offset="1" stopColor={c.champagne} />
        </linearGradient>
      </defs>
      <path d="M0 5L-9 8L-4 0L-8-7L1-4L9-9L7 1L11 7Z" fill={c.sage} fillOpacity=".6" stroke="none" />
      {[0, 64, 126, 187, 248, 307].map((angle, i) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <path d={i % 2 ? 'M0 3C-6-1-8-14-3-22C2-27 7-15 5-7Q4 0 0 3Z' : 'M0 3C-7-3-7-18-1-26C5-22 8-10 4-3Z'} fill={`url(#${pigment})`} />
          <path d="M-1-19Q-3-9 0-2M2-16Q3-8 1-4" fill="none" strokeOpacity=".45" strokeWidth=".55" />
        </g>
      ))}
      <path d="M0-5L2-2L6 0L2 2L0 5L-2 2L-5 0L-2-2Z" fill={c.champagne} strokeWidth=".7" />
      <circle r="1.7" fill={c.gold} stroke="none" />
    </g>
  )
}

function MarigoldBloom({ transform }: { transform?: string }) {
  const pigment = useId()
  return (
    <g transform={transform} stroke={c.gold} strokeLinejoin="round">
      <defs>
        <radialGradient id={pigment} cx=".4" cy=".35" r=".8">
          <stop stopColor={c.goldPale} />
          <stop offset=".5" stopColor={c.champagne} />
          <stop offset="1" stopColor={c.goldSoft} />
        </radialGradient>
      </defs>
      <path d="M0-28C6-34 11-28 14-26C23-29 28-22 27-16C36-12 33-4 32 0C36 8 29 13 26 16C29 24 20 29 14 28C9 35 1 31-3 30C-12 35-18 28-19 24C-29 26-33 17-30 11C-36 5-32-2-30-6C-35-13-28-22-22-21C-20-31-11-31-7-27Q-3-31 0-28Z" fill={c.goldSoft} strokeWidth="1.1" />
      {[0, 43, 91, 137, 184, 225, 270, 317].map(angle => (
        <g key={angle} transform={`rotate(${angle})`}>
          <path d="M-4 1C-13-3-22-12-19-20Q-16-25-11-21C-9-31-1-30 1-24C9-28 13-20 9-14Q5-4-4 1Z" fill={`url(#${pigment})`} strokeWidth=".75" />
          <path d="M-13-19Q-12-10-5-4M-6-22Q-7-11-3-5M2-21Q3-13-1-6" fill="none" strokeWidth=".5" strokeOpacity=".55" />
        </g>
      ))}
      {[21, 86, 143, 204, 264, 325].map((angle, i) => (
        <path key={angle} transform={`rotate(${angle})`} d="M0 5C-7 0-13-5-10-12Q-7-16-3-12C0-19 6-15 6-10C11-8 7 1 0 5Z" fill={i % 2 ? c.goldPale : c.champagne} strokeWidth=".9" />
      ))}
      <path d="M-5 4C-12-2-3-10 2-7C9-10 12-1 6 3C8 9-2 10-5 4ZM-4 1Q1-5 5 0L0 4Z" fill={c.goldSoft} strokeWidth=".95" />
    </g>
  )
}

function LotusBloom({ transform }: { transform?: string }) {
  const pigment = useId()
  return (
    <g transform={transform} stroke={c.goldSoft} strokeWidth=".95" strokeLinejoin="round">
      <defs>
        <linearGradient id={pigment} x1=".25" y1="0" x2=".6" y2="1">
          <stop stopColor={c.blushDeep} />
          <stop offset=".24" stopColor={c.blushDeep} />
          <stop offset=".8" stopColor={c.blush} />
          <stop offset="1" stopColor={c.ivoryDeep} />
        </linearGradient>
      </defs>
      <path d="M0 12C-33 12-51-2-55-24C-32-27-12-12 0 6C11-13 33-28 56-24C50-2 31 13 0 12Z" fill={c.blushDeep} fillOpacity=".78" />
      <path d="M0 10C-31 5-43-23-34-43C-12-39 0-15 0 10Z" fill={`url(#${pigment})`} />
      <path d="M0 10C29 5 44-23 33-45C11-38 0-14 0 10Z" fill={`url(#${pigment})`} />
      <path d="M0 11C-23-6-24-34 0-60C24-33 22-5 0 11Z" fill={`url(#${pigment})`} />
      <path d="M0 12C-20 12-35 2-38-17C-19-18-5-3 0 12ZM0 12C21 12 36 1 39-17C20-18 5-3 0 12Z" fill={`url(#${pigment})`} />
      <path d="M0-48Q-6-20 0 7M-29-34Q-14-18-9 1M28-35Q13-19 9 1M-45-19Q-33-5-18 2M45-19Q33-5 18 2" fill="none" strokeOpacity=".6" strokeWidth=".9" />
      <path d="M-6-43Q-14-22-5-3M6-43Q13-22 5-3M-31-26Q-25-9-13 2M30-27Q26-11 13 2M-28-12Q-17-9-9 4M28-12Q17-9 9 4" fill="none" strokeOpacity=".45" strokeWidth=".55" />
      <path d="M-24 11Q0 23 25 11Q2 17-24 11Z" fill={c.sage} fillOpacity=".6" stroke={c.sage} />
    </g>
  )
}

function LotusLeaf({ transform }: { transform: string }) {
  return (
    <g transform={transform} stroke={c.sage} strokeWidth=".9" strokeOpacity=".62" strokeLinejoin="round">
      <path d="M0 17C-28 21-55 5-51-17C-61-34-34-56-19-51C-4-65 27-54 30-44C52-44 66-19 49-3C46 15 23 24 6 15L2-17Z" fill={c.sage} fillOpacity=".28" />
      <path d="M2-17Q-15-29-22-49M2-17Q-28-19-49-30M2-17Q-20-5-41 2M2-17Q-3-38 5-53M2-17Q26-29 42-31M2-17Q24-13 49-8M2-17Q18 4 25 16" fill="none" strokeWidth=".65" />
      <path d="M-14-29L-29-33M-25-19L-32-28M24-13L32-20M17 1L28 2" fill="none" strokeWidth=".5" />
    </g>
  )
}

export function LotusGarden({ className }: ArtProps) {
  const id = useId()
  return (
    <svg className={artClass(className)} viewBox="0 0 1000 400" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={c.ivory} stopOpacity="0" />
          <stop offset=".58" stopColor={c.ivory} stopOpacity=".55" />
          <stop offset="1" stopColor={c.champagne} stopOpacity=".3" />
        </linearGradient>
      </defs>
      <path d="M0 210Q190 173 366 221T697 205T1000 231V400H0Z" fill={`url(#${id})`} />
      <g fill="none" stroke={c.goldSoft} strokeWidth="1.15" strokeOpacity=".55" strokeLinecap="round">
        <path d="M13 302Q104 288 181 305M226 326Q300 311 382 329M437 301Q527 286 598 301M657 339Q748 322 847 337M874 295Q940 282 998 296" />
        <path d="M39 331Q83 339 135 332M185 367Q286 355 372 368M406 348Q476 356 559 349M604 376Q724 361 790 372M853 355Q927 368 999 355" />
      </g>
      <g fill={c.sage} fillOpacity=".26" stroke={c.sage} strokeOpacity=".58" strokeWidth="1.2">
        <path d="M99 308C37 307 19 283 81 269C142 255 196 278 176 297L114 284Z" />
        <path d="M332 323C263 333 222 313 263 294C303 275 368 285 381 307L311 300Z" />
        <path d="M665 327C608 315 624 292 681 295C747 291 782 316 731 331L686 312Z" />
        <path d="M876 302C823 302 802 275 856 260C911 245 961 267 948 288L881 276Z" />
        <path d="M101 289L56 284M99 289L93 275M326 302L275 300M333 307L365 303M684 312L647 304M708 316L741 316M881 276L845 271M893 275L919 263" fill="none" strokeWidth=".75" />
      </g>
      <g fill="none" stroke={c.sage} strokeWidth="2" strokeLinecap="round">
        <path d="M112 299C124 240 92 179 131 125M265 321C255 265 280 209 265 160M327 331Q341 279 344 225M495 346Q523 294 509 248M709 320C735 264 709 182 758 129M728 319Q682 250 705 186M887 292Q875 229 899 199" />
        <path d="M226 338Q200 250 215 214M805 351Q830 279 806 243" strokeWidth="1.35" />
      </g>
      <Leaf x={119} y={243} rotate={-37} scale={.9} />
      <Leaf x={285} y={272} rotate={35} scale={.7} pale />
      <Leaf x={726} y={243} rotate={31} scale={.85} />
      <Leaf x={885} y={255} rotate={-42} scale={.65} pale />
      <LotusLeaf transform="translate(236 279) rotate(-28) scale(1.12)" />
      <LotusLeaf transform="translate(791 265) rotate(23) scale(1.08)" />
      <LotusLeaf transform="translate(349 322) rotate(16) scale(.7)" />
      <LotusBloom transform="translate(131 124) rotate(-13) scale(.85)" />
      <LotusBloom transform="translate(265 160) rotate(-8) scale(1.2)" />
      <LotusBloom transform="translate(344 225) rotate(12) scale(.72)" />
      <LotusBloom transform="translate(509 247) rotate(-8) scale(.54)" />
      <LotusBloom transform="translate(705 186) rotate(-16) scale(.87)" />
      <LotusBloom transform="translate(758 129) rotate(14) scale(1.26)" />
      <LotusBloom transform="translate(899 198) rotate(-6) scale(.75)" />
      <g fill={c.blushDeep} stroke={c.goldSoft} strokeWidth="1">
        <path d="M215 216C195 204 202 187 216 173C232 188 233 203 215 216ZM806 247C790 235 793 219 806 205C822 220 822 236 806 247Z" />
        <path d="M216 181Q210 199 215 210M806 212Q812 230 806 240" fill="none" />
      </g>
      <g fill={c.blushDeep} fillOpacity=".65">
        <path d="M395 353q13-10 21-2q-11 9-21 2ZM583 320q8-13 18-5q-8 11-18 5ZM168 347q7-9 16-3q-8 7-16 3Z" />
      </g>
    </svg>
  )
}

function JaliWindow({ x, y, width = 20, height = 37, pattern }: {
  x: number
  y: number
  width?: number
  height?: number
  pattern: string
}) {
  return (
    <g>
      <path d={`M${x - 3} ${y + height + 3}V${y + width / 2}Q${x + width / 2} ${y - 10} ${x + width + 3} ${y + width / 2}V${y + height + 3}Z`} fill={c.champagne} stroke={c.goldSoft} strokeWidth="1" />
      <path d={`M${x} ${y + height}V${y + width / 2}Q${x + width / 2} ${y - 5} ${x + width} ${y + width / 2}V${y + height}Z`} fill={`url(#${pattern})`} stroke={c.goldInk} strokeWidth="1.1" />
      <path d={`M${x - 5} ${y + height + 5}h${width + 10}`} stroke={c.goldInk} strokeWidth="1.4" />
    </g>
  )
}

function Chhatri({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={c.goldInk} strokeLinejoin="round">
      <path d="M-31 4H31V13H-31Z" fill={c.goldPale} strokeWidth="1.25" />
      <path d="M-25 4V-30H25V4M-9 4V-31M9 4V-31" fill={c.blushDeep} fillOpacity=".5" strokeWidth="2.5" />
      <path d="M-23-4V-18Q-16-31-10-18M-7-6V-19Q0-32 7-19M10-4V-18Q17-31 23-18" fill="none" strokeWidth="1.05" />
      <path d="M-37-30L-31-37H31L37-30Z" fill={c.champagne} strokeWidth="1.3" />
      <path d="M-28-37C-27-49-15-55-7-62Q0-71 7-62C15-55 27-49 28-37Z" fill={c.cream} strokeWidth="1.45" />
      <path d="M-18-38Q-18-50-4-61M0-38V-62M18-38Q18-50 4-61" fill="none" stroke={c.gold} strokeWidth=".85" />
      <path d="M0-65V-78M-4-72H4" fill="none" strokeWidth="1.35" />
      <path d="M0-83L3-78L0-75L-3-78Z" fill={c.gold} strokeWidth=".7" />
      <path d="M-32 9H32M-29-33H29" fill="none" stroke={c.gold} strokeWidth=".8" />
    </g>
  )
}

function FortBastion({ x, top, width, bottom, fill, pattern }: {
  x: number
  top: number
  width: number
  bottom: number
  fill: string
  pattern: string
}) {
  const left = x - width / 2
  return (
    <g>
      <path d={`M${left} ${top}Q${x} ${top + 11} ${left + width} ${top}V${bottom - 8}Q${x} ${bottom + 12} ${left} ${bottom - 8}Z`} fill={fill} stroke={c.goldInk} strokeWidth="1.65" />
      <path d={`M${left + width - 18} ${top + 4}L${left + width} ${top}V${bottom - 8}L${left + width - 18} ${bottom - 3}Z`} fill={c.goldSoft} fillOpacity=".2" />
      <path d={`M${left + 2} ${top + 8}Q${left + 12} ${top + 56} ${left + 7} ${top + 92}T${left + 11} ${bottom - 8}L${left + 21} ${bottom - 4}Q${left + 16} ${top + 61} ${left + 22} ${top + 10}Z`} fill={c.ivory} fillOpacity=".28" />
      <path d={`M${left + 9} ${top + 8}V${bottom - 9}M${left + width - 10} ${top + 8}V${bottom - 9}`} fill="none" stroke={c.goldSoft} strokeWidth="1" />
      {[28, 65, 116].map((offset, i) => (
        <g key={offset}>
          <path d={`M${left} ${top + offset}Q${x} ${top + offset + 12} ${left + width} ${top + offset}v${i === 1 ? 15 : 8}Q${x} ${top + offset + (i === 1 ? 27 : 20)} ${left} ${top + offset + (i === 1 ? 15 : 8)}Z`} fill={i === 1 ? c.champagne : c.blushDeep} stroke={c.gold} strokeWidth=".8" />
          {i === 1 && [-2, -1, 0, 1, 2].map(n => (
            <path key={n} d={`M${x + n * width / 6} ${top + offset + 7 + (2 - Math.abs(n)) * 2}l3 4-3 4-3-4Z`} fill={c.goldSoft} stroke={c.goldInk} strokeWidth=".6" />
          ))}
        </g>
      ))}
      <JaliWindow x={x - 8} y={top + 42} width={16} height={18} pattern={pattern} />
      <JaliWindow x={x - 9} y={top + 88} width={18} height={23} pattern={pattern} />
      <path d={`M${left - 5} ${top - 6}Q${x} ${top + 3} ${left + width + 5} ${top - 6}v9Q${x} ${top + 13} ${left - 5} ${top + 3}Z`} fill={c.goldPale} stroke={c.goldInk} strokeWidth="1.3" />
      <Chhatri x={x} y={top - 12} scale={width / 87} />
    </g>
  )
}

export function FortPanorama({ className }: ArtProps) {
  const id = useId()
  const stone = `${id}-stone`
  const cliff = `${id}-cliff`
  const haze = `${id}-haze`
  const lattice = `${id}-jali`
  return (
    <svg className={artClass(className)} viewBox="0 0 1000 560" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={stone} x1="0" y1="0" x2=".85" y2="1">
          <stop stopColor={c.goldPale} />
          <stop offset=".48" stopColor={c.cream} />
          <stop offset="1" stopColor={c.blushDeep} />
        </linearGradient>
        <linearGradient id={cliff} x1="0" y1="0" x2=".2" y2="1">
          <stop stopColor={c.blushDeep} />
          <stop offset=".65" stopColor={c.cream} />
          <stop offset="1" stopColor={c.ivory} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={haze}>
          <stop stopColor={c.champagne} stopOpacity=".75" />
          <stop offset=".68" stopColor={c.blush} stopOpacity=".45" />
          <stop offset="1" stopColor={c.blush} stopOpacity="0" />
        </radialGradient>
        <pattern id={lattice} width="6" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0H6V8H0Z" fill={c.cream} />
          <path d="M-3 4L3-4L9 4L3 12Z" fill="none" stroke={c.goldInk} strokeWidth=".65" />
        </pattern>
      </defs>
      <ellipse cx="510" cy="250" rx="450" ry="226" fill={`url(#${haze})`} />
      <circle cx="733" cy="125" r="52" fill={c.champagne} fillOpacity=".45" />
      <circle cx="733" cy="125" r="43" fill="none" stroke={c.goldSoft} strokeWidth=".7" strokeOpacity=".36" />
      <g data-fort-ridge="" strokeLinejoin="round">
        <path d="M15 365C84 335 112 361 160 327C214 289 246 315 288 291C339 265 369 298 426 280C483 260 495 290 552 274C598 261 635 292 685 280C738 261 774 296 822 289C881 279 920 323 985 337L985 440H15Z" fill={c.cream} fillOpacity=".6" />
        <path d="M0 403Q70 347 154 375T314 362T477 365T650 350T818 362T1000 377V452H0Z" fill={c.blushDeep} fillOpacity=".25" />
        <path d="M51 369Q109 341 142 354M858 318Q908 320 951 345" fill="none" stroke={c.sage} strokeOpacity=".35" strokeWidth="1" />
      </g>
      <g data-fort-mass="escarpment">
        <path d="M69 377L108 356L158 347L196 342L266 350L318 335L416 346L457 337L543 344L597 334L663 349L720 339L782 350L832 343L885 360L922 383L941 433L979 488Q911 487 853 513Q770 501 718 523Q630 508 567 526Q482 513 402 528Q322 507 258 521Q189 500 121 509L25 480L51 434Z" fill={`url(#${cliff})`} />
        <path d="M100 372L129 378L114 409L136 429L125 465L151 477L165 493L121 488L92 452L97 419L79 406ZM262 360L280 376L264 396L281 425L261 452L285 478L244 465L235 421L250 393ZM589 357L612 379L599 412L618 448L607 483L573 497L590 453L576 422L587 391ZM828 365L855 377L864 406L852 435L877 458L886 485L846 468L833 433L842 408Z" fill={c.blushDeep} fillOpacity=".46" />
        <path d="M166 372L191 386L183 404L198 423L193 451M344 357L356 389L345 418L367 438L360 476M449 357L442 390L458 412L444 433M703 356L690 386L710 408L697 452M897 382L882 400L894 422" fill="none" stroke={c.gold} strokeOpacity=".42" strokeWidth="1.5" />
        <path d="M117 394L150 397L169 389M201 441L224 445L250 437M282 386L309 389L341 380M365 458L403 462L428 452M477 392L508 400L540 391M625 435L661 442L688 433M736 383L766 391L803 383M743 481L775 475L798 480" fill="none" stroke={c.inkSoft} strokeOpacity=".22" strokeWidth="1" />
        <path d="M69 377Q132 350 193 355T315 350T463 349T595 347T737 353T882 365" fill="none" stroke={c.goldInk} strokeOpacity=".52" strokeWidth="2" />
      </g>
      <g data-fort-mass="palace" strokeLinejoin="round">
        <path d="M118 347V242H264V211H381V193H594V215H722V248H871V362L749 373L585 368L415 375L242 364Z" fill={`url(#${stone})`} stroke={c.goldInk} strokeWidth="1.6" />
        <path d="M385 233Q437 219 468 244T560 234L589 273Q486 254 387 277ZM704 275Q750 266 785 284T870 278V308Q794 286 708 306Z" fill={c.ivory} fillOpacity=".24" />
        <path d="M216 328Q244 316 282 336T386 329V367L242 357ZM538 334Q581 320 617 338T719 329V363L584 359Z" fill={c.blushDeep} fillOpacity=".24" />
        <path d="M381 202H594V231H381Z" fill={c.champagne} />
        <path d="M121 264H871V276H121ZM121 313H871V325H121Z" fill={c.champagne} stroke={c.gold} strokeWidth=".9" />
        <path d="M266 236H721V245H266Z" fill={c.blushDeep} stroke={c.goldSoft} strokeWidth=".8" />
        <path d="M382 190H395V184H406V190H420V184H431V190H446V184H457V190H472V184H483V190H498V184H509V190H524V184H535V190H550V184H561V190H579V184H592V198H382Z" fill={c.goldPale} stroke={c.gold} strokeWidth="1" />
        {[403, 437, 471, 505, 539, 573].map(x => <JaliWindow key={x} x={x} y={211} width={12} height={17} pattern={lattice} />)}
        {[216, 254, 386, 423, 460, 498, 536, 573, 704, 742, 779].map((x, i) => <JaliWindow key={x} x={x} y={i % 3 === 0 ? 284 : 285} width={16} height={24} pattern={lattice} />)}
        {[221, 262, 381, 420, 458, 536, 575, 704, 743, 783].map(x => (
          <path key={x} d={`M${x} 337q5-11 10 0v15h-10Z`} fill={c.blushDeep} stroke={c.gold} strokeWidth=".95" />
        ))}
        <path d="M478 365V340Q499 312 520 340V368" fill={c.blushDeep} stroke={c.goldInk} strokeWidth="1.3" />
        <path d="M487 366V344Q499 326 512 344V367M498 334V366" fill="none" stroke={c.goldInk} strokeWidth="1" />
        {Array.from({ length: 33 }, (_, i) => (
          <path key={i} d={`M${126 + i * 22} 271l4-4 4 4-4 4ZM${126 + i * 22} 319q4-7 8 0q-4 6-8 0Z`} fill={c.goldSoft} stroke={c.gold} strokeWidth=".65" />
        ))}
        <path d="M114 249H272M263 220H379M595 226H728M718 254H876M118 330H871M388 255H608" fill="none" stroke={c.goldInk} strokeOpacity=".6" strokeWidth=".9" />
        <FortBastion x={165} top={213} width={82} bottom={365} fill={`url(#${stone})`} pattern={lattice} />
        <FortBastion x={330} top={189} width={98} bottom={371} fill={`url(#${stone})`} pattern={lattice} />
        <FortBastion x={658} top={200} width={96} bottom={372} fill={`url(#${stone})`} pattern={lattice} />
        <FortBastion x={840} top={235} width={72} bottom={369} fill={`url(#${stone})`} pattern={lattice} />
        <path d="M120 370Q290 395 463 385T873 379L874 388Q643 414 483 400T119 382Z" fill={c.cream} stroke={c.gold} strokeWidth="1.1" />
        <path d="M137 379L166 382M201 386L240 389M278 391L315 393M366 394H404M448 394L480 393M532 393L571 392M611 391L646 390M690 389L728 387M768 387L805 385M835 385L859 382" fill="none" stroke={c.goldInk} strokeOpacity=".4" />
      </g>
      <g fill="none" stroke={c.goldInk} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path data-fort-outline="" pathLength="1" d="M69 377L108 356L123 352M124 357V214M124 207Q165 217 207 207M207 213V244H280V189M280 183Q330 194 380 183" />
        <path data-fort-outline="" pathLength="1" d="M380 194H594V216H610M610 194Q658 205 706 194M706 201V249H804M804 229Q840 239 876 229V361L921 383" />
        <path data-fort-outline="" pathLength="1" d="M287 139L295 132Q300 116 320 103L330 93L340 103Q360 116 365 132L373 139M621 151L628 144Q632 128 648 116L658 106L669 116Q685 128 688 144L695 151" />
        <path data-fort-outline="" pathLength="1" d="M119 382Q300 407 478 400T874 388" />
      </g>
      <g fill="none" stroke={c.sage} strokeWidth="1.35" strokeLinecap="round">
        <path d="M29 511Q57 467 56 426M55 475Q78 454 90 425M42 490Q23 468 18 453M936 515Q921 477 934 440M931 481Q953 467 966 451M927 465Q913 454 904 437" />
        <Leaf x={55} y={466} rotate={-36} scale={.68} />
        <Leaf x={51} y={486} rotate={57} scale={.7} />
        <Leaf x={29} y={485} rotate={-46} scale={.6} pale />
        <Leaf x={75} y={455} rotate={35} scale={.57} pale />
        <Leaf x={930} y={480} rotate={-24} scale={.65} />
        <Leaf x={935} y={495} rotate={62} scale={.67} />
        <Leaf x={922} y={465} rotate={-52} scale={.58} pale />
        <Leaf x={956} y={469} rotate={48} scale={.52} />
      </g>
      <path d="M130 509Q260 527 341 515M417 533Q520 523 588 531M683 515Q785 527 858 510" fill="none" stroke={c.goldSoft} strokeOpacity=".48" strokeWidth="1.15" />
    </svg>
  )
}

const courtyardArch = 'M128 628V329C128 303 136 282 157 272C146 249 163 222 190 222C184 197 210 177 234 183C239 157 267 146 289 158C300 132 328 122 353 134C366 113 391 106 400 89C409 106 434 113 447 134C472 122 500 132 511 158C533 146 561 157 566 183C590 177 616 197 610 222C637 222 654 249 643 272C664 282 672 303 672 329V628'

function HangingLamp({ x, y, chain = 85 }: { x: number; y: number; chain?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={c.goldInk} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M0 0V${chain}M-2 13H2M-2 28H2M-2 43H2`} fill="none" strokeWidth=".9" />
      <path d={`M0 ${chain - 5}l6 8-6 7-6-7Z`} fill={c.champagne} strokeWidth="1" />
      <g transform={`translate(0 ${chain + 12})`}>
        <path d="M-16 0L-10-5H10L16 0L10 25H-10Z" fill={c.champagne} strokeWidth="1.2" />
        <path d="M-10 3H10L6 20H-6Z" fill={c.goldPale} stroke={c.gold} strokeWidth=".85" />
        <path d="M-16 0H16M-12 25H12M0 26V35M-4 32L0 36L4 32M0 1V24" fill="none" strokeWidth="1" />
        <circle data-lantern-light="" cx="0" cy="13" r="3.2" fill={c.ivory} stroke="none" />
        <circle cx="0" cy="13" r="7.5" fill={c.ivory} fillOpacity=".3" stroke="none" />
      </g>
    </g>
  )
}

export function CourtyardArt({ className }: ArtProps) {
  const id = useId()
  const wall = `${id}-wall`
  const arch = `${id}-arch`
  const lattice = `${id}-screen`
  const baluster = `${id}-baluster`
  const print = `${id}-print`
  const passage = `${id}-passage`
  return (
    <svg className={artClass(className)} viewBox="0 0 800 700" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={wall} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={c.blush} />
          <stop offset=".72" stopColor={c.blushDeep} />
          <stop offset="1" stopColor={c.cream} />
        </linearGradient>
        <linearGradient id={arch} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={c.ivoryDeep} />
          <stop offset=".5" stopColor={c.cream} />
          <stop offset="1" stopColor={c.blushDeep} />
        </linearGradient>
        <linearGradient id={passage} x1="0" y1="0" x2=".75" y2="1">
          <stop stopColor={c.blushDeep} />
          <stop offset=".6" stopColor={c.cream} />
          <stop offset="1" stopColor={c.ivory} />
        </linearGradient>
        <pattern id={print} width="29" height="39" patternUnits="userSpaceOnUse">
          <g transform="scale(.3)" color={c.goldInk}><ButiMark /></g>
        </pattern>
        <pattern id={lattice} width="9" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 0H9V12H0Z" fill={c.blushDeep} fillOpacity=".6" />
          <path d="M0 6L4.5 0L9 6L4.5 12ZM4.5 4L6 6L4.5 8L3 6Z" fill="none" stroke={c.gold} strokeWidth=".75" />
        </pattern>
        <g id={baluster} fill={c.ivoryDeep} stroke={c.gold} strokeWidth="1.05">
          <path d="M-5 0H5V4L3 8L5 15Q8 21 3 26V31H6V35H-6V31H-3V26Q-8 21-5 15L-3 8L-5 4Z" />
          <path d="M-3 8H3M-4 15H4M-3 26H3" fill="none" />
        </g>
      </defs>
      <g data-courtyard-layer="distance">
        <path d="M75 132Q395 61 725 148L739 604H62Z" fill={c.blush} />
        <ellipse cx="394" cy="273" rx="250" ry="199" fill={c.ivory} fillOpacity=".65" />
        <path d="M151 465V355H192V330H273V354H337V326H455V346H520V313H600V350H654V465Z" fill={c.cream} fillOpacity=".6" />
        <path d="M90 482Q147 436 212 457T341 450T471 460T610 443T726 473V546H90Z" fill={c.sage} fillOpacity=".19" />
        <path d="M213 474Q202 433 215 405M584 467Q596 437 584 414" fill="none" stroke={c.sage} strokeWidth="1.2" strokeOpacity=".5" />
      </g>
      <g data-courtyard-layer="passage" strokeLinejoin="round">
        <path d="M208 503V268Q208 163 400 123Q592 163 592 268V503Z" fill={c.blushDeep} fillOpacity=".4" />
        <path d={courtyardArch} transform="translate(144 162) scale(.64 .55)" fill={c.ivoryDeep} stroke={c.goldSoft} strokeWidth="3" />
        <path d={courtyardArch} transform="translate(184 183) scale(.54 .49)" fill={`url(#${passage})`} stroke={c.gold} strokeWidth="2.5" />
        <path d={courtyardArch} transform="translate(228 207) scale(.43 .43)" fill={c.blush} stroke={c.goldSoft} strokeWidth="2" />
        <path d="M285 348L330 312M515 348L470 312M252 344V305M548 344V305" fill="none" stroke={c.goldSoft} strokeWidth="1.3" />
        <path d="M349 354Q333 310 351 281M446 354Q465 323 451 290" fill="none" stroke={c.sage} strokeWidth="1.2" />
        <Leaf x={349} y={327} rotate={-42} scale={.55} pale />
        <Leaf x={451} y={336} rotate={34} scale={.6} />
      </g>
      <g data-courtyard-layer="arcade">
        <path d="M105 355H695V539H105Z" fill={`url(#${wall})`} />
        <path d="M99 349H701V361H99ZM106 383H694V391H106Z" fill={c.champagne} stroke={c.goldSoft} strokeWidth="1.1" />
        {[176, 288, 400, 512, 624].map(x => (
          <g key={x}>
            <path d={`M${x - 30} 505V427Q${x - 30} 414 ${x - 18} 411Q${x - 19} 396 ${x} 389Q${x + 19} 396 ${x + 18} 411Q${x + 30} 414 ${x + 30} 427V505Z`} fill={c.ivoryDeep} stroke={c.goldInk} strokeWidth="1.45" />
            <path d={`M${x - 23} 506V433Q${x - 24} 419 ${x - 12} 418Q${x - 12} 405 ${x} 401Q${x + 12} 405 ${x + 12} 418Q${x + 24} 419 ${x + 23} 433V506Z`} fill={`url(#${passage})`} />
            <path d={`M${x - 23} 506V433Q${x - 24} 419 ${x - 12} 418Q${x - 12} 405 ${x} 401L${x + 5} 413Q${x - 7} 421 ${x - 8} 438V506Z`} fill={c.inkSoft} fillOpacity=".09" />
            <path d={`M${x - 38} 403V504M${x + 38} 403V504M${x - 42} 501h12M${x + 30} 501h12`} fill="none" stroke={c.goldSoft} strokeWidth="2.2" />
          </g>
        ))}
        {Array.from({ length: 23 }, (_, i) => (
          <path key={i} d={`M${117 + i * 25} 372l4-5 4 5-4 5Z`} fill={c.goldPale} stroke={c.gold} strokeWidth=".75" />
        ))}
        <path d="M105 532H695L754 643H46Z" fill={c.ivoryDeep} stroke={c.goldSoft} strokeWidth="1" />
        <path d="M128 550H675M100 577H701M73 609H730M252 535L194 640M348 535L326 642M448 535L473 643M548 535L610 641" fill="none" stroke={c.goldSoft} strokeOpacity=".5" strokeWidth=".9" />
        <path d="M275 584Q400 551 525 584Q400 619 275 584Z" fill={c.blush} stroke={c.goldSoft} strokeWidth="1.1" />
        <path d="M304 584Q400 563 496 584Q400 607 304 584ZM352 584Q400 571 448 584Q400 597 352 584Z" fill="none" stroke={c.gold} strokeOpacity=".55" strokeWidth=".9" />
      </g>
      <g data-courtyard-layer="balcony">
        <path d="M105 498H695V508H105ZM105 544H695V554H105Z" fill={c.champagne} stroke={c.goldInk} strokeWidth="1.4" />
        {Array.from({ length: 27 }, (_, i) => <use key={i} href={`#${baluster}`} x={114 + i * 22} y={509} />)}
        <path d="M100 495H700M100 557H700" stroke={c.goldInk} strokeWidth="1.3" />
        {[106, 247, 400, 553, 694].map(x => (
          <g key={x} fill={c.cream} stroke={c.gold} strokeWidth="1">
            <path d={`M${x - 7} 498V549h14v-51Z`} />
            <path d={`M${x - 10} 494h20v6h-20ZM${x - 8} 489q8-13 16 0Z`} fill={c.goldPale} />
          </g>
        ))}
      </g>
      <g data-courtyard-layer="arch" strokeLinejoin="round">
        <path d={`M29 640V55Q400 23 771 55V640Z${courtyardArch}Z`} fill={`url(#${arch})`} fillRule="evenodd" stroke={c.goldSoft} strokeWidth="1.4" />
        <path d={`M29 640V55Q400 23 771 55V640Z${courtyardArch}Z`} fill={`url(#${print})`} fillRule="evenodd" opacity=".24" />
        <path d={courtyardArch} transform="translate(8 9)" fill="none" stroke={c.inkSoft} strokeOpacity=".1" strokeWidth="9" />
        <path d={courtyardArch} fill="none" stroke={c.goldInk} strokeWidth="2.4" />
        <path d={courtyardArch} transform="translate(-12 -10) scale(1.03 1)" fill="none" stroke={c.goldSoft} strokeWidth="1.2" />
        <path d="M49 623V76Q400 48 751 76V623M61 621V91Q400 64 739 91V621" fill="none" stroke={c.gold} strokeOpacity=".6" strokeWidth=".9" />
        <path d="M83 622V334M105 622V337M695 622V337M717 622V334" fill="none" stroke={c.goldSoft} strokeWidth="1.4" />
        {[78, 699].map(x => (
          <g key={x}>
            <JaliWindow x={x} y={215} width={23} height={61} pattern={lattice} />
            <path d={`M${x - 12} 284h47l-8 8h-31ZM${x - 6} 295h36l-5 7h-26Z`} fill={c.goldPale} stroke={c.gold} strokeWidth="1" />
          </g>
        ))}
        <path d="M172 160Q212 96 279 99M628 160Q588 96 521 99" fill="none" stroke={c.gold} strokeWidth="1.2" />
        <Leaf x={194} y={133} rotate={-15} scale={.48} pale />
        <Leaf x={219} y={114} rotate={-69} scale={.4} />
        <Leaf x={606} y={133} rotate={22} scale={.48} pale />
        <Leaf x={581} y={114} rotate={68} scale={.4} />
        <JasmineBloom transform="translate(253 105) rotate(14) scale(.68)" />
        <JasmineBloom transform="translate(548 105) rotate(-19) scale(.68)" />
        <path d="M385 61L400 46L415 61L400 77Z" fill={c.goldPale} stroke={c.gold} strokeWidth="1.1" />
        <path d="M393 61L400 53L407 61L400 69Z" fill={c.blushDeep} stroke={c.gold} strokeWidth=".7" />
        <path d="M65 624H137V638H65ZM663 624H735V638H663ZM22 640H778V654H22ZM43 657H757V668H43Z" fill={c.cream} stroke={c.gold} strokeWidth="1.1" />
        <path d="M49 664H751M29 647H771" stroke={c.goldSoft} strokeWidth=".8" />
      </g>
      <g data-courtyard-layer="lamps">
        <HangingLamp x={237} y={183} chain={98} />
        <HangingLamp x={563} y={183} chain={98} />
        <HangingLamp x={400} y={94} chain={98} />
      </g>
      <g data-courtyard-layer="foreground">
        <path d="M154 625Q176 589 162 553M650 625Q628 587 645 552" fill="none" stroke={c.sage} strokeWidth="1.3" />
        <Leaf x={163} y={591} rotate={-34} scale={.53} />
        <Leaf x={161} y={610} rotate={53} scale={.58} pale />
        <Leaf x={640} y={588} rotate={32} scale={.53} />
        <Leaf x={643} y={608} rotate={-56} scale={.6} pale />
        <path d="M143 622H179L173 646H149ZM625 622H661L655 646H631Z" fill={c.blushDeep} stroke={c.gold} strokeWidth="1.2" />
        <path d="M144 628H178M626 628H660" stroke={c.champagne} strokeWidth="2" />
      </g>
    </svg>
  )
}

function MandapPillar({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`} stroke={c.gold} strokeLinejoin="round">
      <path d="M-23 260H23L19 589H-19Z" fill={c.cream} stroke={c.goldInk} strokeWidth="1.85" />
      <path d="M-23 260H-12L-9 589H-19ZM12 260H23L19 589H9Z" fill={c.blushDeep} fillOpacity=".82" stroke="none" />
      <path d="M-8 278L-6 570M0 279V570M8 278L6 570" fill="none" stroke={c.goldSoft} strokeWidth="1" />
      <path d="M-32 221H32V235H-32ZM-29 247H29V263H-29ZM-23 581H23V597H-23ZM-33 612H33V628H-33Z" fill={c.champagne} stroke={c.goldInk} strokeWidth="1.45" />
      <path d="M-30 237Q-32 246-20 252L-13 262H13L20 252Q32 246 30 237ZM-22 596Q-27 605-30 611H30Q27 605 22 596Z" fill={c.cream} strokeWidth="1.2" />
      <path d="M-24 240Q-12 247-11 257M-13 239L-5 259M0 239V259M13 239L5 259M24 240Q12 247 11 257" fill="none" strokeWidth="1" />
      <path d="M-17 353Q0 345 17 353V373Q0 381-17 373ZM-18 499Q0 491 18 499V517Q0 525-18 517Z" fill={c.goldPale} strokeWidth="1" />
      <path d="M-15 362L-8 357L0 364L8 357L15 362M-16 509L-8 503L0 510L8 503L16 509" fill="none" stroke={c.goldInk} strokeWidth=".95" />
      <path d="M-40 627Q-32 606-20 612Q-17 595-7 608Q0 590 7 608Q17 595 20 612Q32 606 40 627Z" fill={c.blush} strokeWidth="1.2" />
      <path d="M-20 612L-13 626M-7 608L-5 626M7 608L5 626M20 612L13 626M-44 628H44V639H-44Z" fill={c.champagne} strokeWidth="1.1" />
      <path d="M-29 230H29M-26 254H26M-29 620H29M-36 633H36" fill="none" stroke={c.goldInk} strokeWidth=".8" />
    </g>
  )
}

function StandingDiya({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={c.goldInk} strokeLinejoin="round">
      <path d="M-24 0Q0 8 24 0Q18 19 0 21Q-18 19-24 0Z" fill={c.champagne} strokeWidth="1.2" />
      <path d="M-5 21H5L3 65L13 76H-13L-3 65ZM-21 78Q0 69 21 78V83H-21Z" fill={c.goldSoft} strokeWidth="1.1" />
      <path d="M0-27C-10-15-9-7 0 0C10-8 8-17 0-27Z" fill={c.goldPale} stroke={c.gold} strokeWidth="1.05" />
      <path d="M0-15Q-5-5 0-1Q5-6 0-15Z" fill={c.ivory} stroke="none" />
      <path d="M-18 6Q0 13 18 6M-2 27V62M-16 79H16" fill="none" stroke={c.gold} strokeWidth=".9" />
    </g>
  )
}

export function MandapArt({ className }: ArtProps) {
  const id = useId()
  const fabric = `${id}-fabric`
  const glow = `${id}-glow`
  const marigold = `${id}-marigold`
  const jasmine = `${id}-jasmine`
  const bud = `${id}-bud`
  return (
    <svg className={artClass(className)} viewBox="0 0 900 780" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={fabric} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={c.blush} />
          <stop offset=".56" stopColor={c.cream} />
          <stop offset="1" stopColor={c.blushDeep} />
        </linearGradient>
        <radialGradient id={glow}>
          <stop stopColor={c.champagne} stopOpacity=".65" />
          <stop offset="1" stopColor={c.champagne} stopOpacity="0" />
        </radialGradient>
        <g id={marigold}><MarigoldBloom /></g>
        <g id={jasmine}><JasmineBloom /></g>
        <g id={bud} stroke={c.goldSoft} strokeWidth=".8">
          <path d="M0-6C-8-9-10-2-3 4L0 9L3 4C10-2 8-9 0-6Z" fill={c.ivory} />
          <path d="M0-6V6M-4-3L0 5L4-3" fill="none" />
        </g>
      </defs>
      <ellipse cx="450" cy="437" rx="341" ry="309" fill={`url(#${glow})`} opacity=".5" />
      <g fill={c.blushDeep} fillOpacity=".2">
        <path d="M172 227Q234 257 239 334L233 598H189Q206 429 172 227ZM728 227Q666 257 661 334L667 598H711Q694 429 728 227Z" />
        <path d="M79 648Q450 605 821 648L844 717Q450 755 56 717Z" />
      </g>
      <g data-mandap="pillars">
        <path d="M87 635H813V659H87ZM65 660H835V685H65ZM43 686H857V718H43Z" fill={c.ivoryDeep} stroke={c.gold} strokeWidth="1.5" />
        <path d="M88 653H812M68 678H832M46 709H854" fill="none" stroke={c.goldSoft} strokeWidth="1.25" />
        <path d="M87 637Q450 621 813 637M65 662Q450 646 835 662M44 689Q450 674 856 689" fill="none" stroke={c.goldPale} strokeWidth="4" />
        {Array.from({ length: 23 }, (_, i) => (
          <path key={i} d={`M${59 + i * 34} 707q-9-5-9-13q9-2 14 8q5-10 14-8q0 8-9 13M${64 + i * 34} 706q-6-8 0-15q6 7 0 15Z`} fill={c.blush} stroke={c.goldSoft} strokeWidth=".9" />
        ))}
        <MandapPillar x={148} />
        <MandapPillar x={752} />
        <path d="M104 215H192V224H104ZM708 215H796V224H708Z" fill={c.goldPale} stroke={c.goldInk} strokeWidth="1.6" />
      </g>
      <g data-mandap="canopy" strokeLinejoin="round">
        <path d="M93 180Q184 134 268 105Q375 119 450 63Q525 119 632 105Q716 134 807 180L788 193H111Z" fill={`url(#${fabric})`} stroke={c.goldInk} strokeWidth="1.9" />
        <path d="M268 108Q286 144 304 177H278Q262 144 258 112ZM450 66Q429 114 420 177H449ZM632 109Q615 147 597 177H573Q602 136 616 111Z" fill={c.blushDeep} fillOpacity=".52" />
        <path d="M280 111Q315 139 331 177H353Q325 134 316 113ZM458 72Q484 118 495 177H518Q499 115 458 72Z" fill={c.ivory} fillOpacity=".35" />
        <path d="M130 176Q229 132 280 127Q380 144 450 89Q520 144 620 127Q671 132 770 176" fill="none" stroke={c.goldSoft} strokeWidth="1.1" />
        <path d="M262 109Q286 145 304 175M346 113Q357 147 366 176M450 73V176M554 113Q543 147 534 176M638 109Q614 145 596 175" fill="none" stroke={c.gold} strokeOpacity=".6" strokeWidth="1.05" />
        <path d="M450 67V39M443 46H457M450 28L455 37L450 42L445 37Z" fill={c.goldSoft} stroke={c.goldInk} strokeWidth="1.3" />
        <path d="M88 178H812V204H88ZM78 202H822V216H78Z" fill={c.champagne} stroke={c.goldInk} strokeWidth="1.7" />
        <path d="M92 184H808M89 199H811M83 209H817" fill="none" stroke={c.gold} strokeWidth="1" />
        {Array.from({ length: 29 }, (_, i) => (
          <path key={i} d={`M${101 + i * 24} 192q5-9 10 0q-5 9-10 0Z`} fill={c.blush} stroke={c.gold} strokeWidth=".95" />
        ))}
        <path d="M188 218Q245 273 302 218Q375 271 450 218Q525 271 598 218Q655 273 712 218" fill="none" stroke={c.blushDeep} strokeWidth="13" />
        <path d="M188 218Q245 273 302 218Q375 271 450 218Q525 271 598 218Q655 273 712 218" fill="none" stroke={c.gold} strokeWidth="1.5" />
        <path d="M188 225Q245 280 302 225Q375 278 450 225Q525 278 598 225Q655 280 712 225" fill="none" stroke={c.goldSoft} strokeWidth="1.2" />
      </g>
      <g data-mandap="garlands">
        <path d="M205 214Q196 324 222 453M235 225Q226 314 247 390M695 214Q704 324 678 453M665 225Q674 314 653 390M194 215Q450 334 706 215" fill="none" stroke={c.gold} strokeWidth="1.35" />
        {Array.from({ length: 17 }, (_, i) => {
          const y = 231 + i * 12.5
          const x = 203 - i * .65 + i * i * .104
          return (
            <g key={i}>
              <use href={`#${bud}`} transform={`translate(${x} ${y}) rotate(-8) scale(.72)`} />
              <use href={`#${bud}`} transform={`translate(${900 - x} ${y}) rotate(8) scale(.72)`} />
            </g>
          )
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const y = 241 + i * 12.2
          const x = 233 - i * .7 + i * i * .13
          return (
            <g key={i}>
              <use href={`#${bud}`} transform={`translate(${x} ${y}) rotate(-10) scale(.66)`} />
              <use href={`#${bud}`} transform={`translate(${900 - x} ${y}) rotate(10) scale(.66)`} />
            </g>
          )
        })}
        {Array.from({ length: 35 }, (_, i) => {
          const t = (i + 1) / 36
          const x = 194 + 512 * t
          const y = 215 + 238 * t * (1 - t)
          return <use key={i} href={`#${bud}`} transform={`translate(${x} ${y + 2}) rotate(${(t - .5) * 46}) scale(.68)`} />
        })}
        {[222, 678].map(x => (
          <g key={x}>
            <use href={`#${marigold}`} transform={`translate(${x} 451) scale(.3)`} />
            <path d={`M${x - 4} 458l-2 19M${x} 459v22M${x + 4} 458l2 19`} fill="none" stroke={c.gold} strokeWidth="1.3" />
          </g>
        ))}
      </g>
      <g data-mandap="flowers">
        <path d="M90 201Q210 226 302 209T450 206T598 209T810 201" fill="none" stroke={c.sage} strokeWidth="2.1" />
        {[
          [136, 208, -64], [179, 213, 72], [281, 217, -53], [327, 217, 66],
          [429, 213, -60], [473, 212, 64], [576, 217, -64], [619, 213, 65],
          [722, 213, -61], [766, 208, 60],
        ].map(([x, y, rotate], i) => <Leaf key={i} x={x} y={y} rotate={rotate} scale={.47} pale={i % 3 === 0} />)}
        {[149, 304, 450, 596, 751].map((x, i) => (
          <g key={x}>
            <use href={`#${marigold}`} transform={`translate(${x} ${i === 2 ? 205 : 214}) rotate(${i * 19}) scale(${i === 2 ? .68 : .55})`} />
            <use href={`#${jasmine}`} transform={`translate(${x - 25} ${i === 2 ? 207 : 217}) rotate(17) scale(.43)`} />
            <use href={`#${jasmine}`} transform={`translate(${x + 25} ${i === 2 ? 205 : 217}) rotate(-23) scale(.41)`} />
          </g>
        ))}
        <use href={`#${marigold}`} transform="translate(247 390) scale(.28)" />
        <use href={`#${marigold}`} transform="translate(653 390) scale(.28)" />
        <LotusBloom transform="translate(147 646) scale(.53)" />
        <LotusBloom transform="translate(753 646) scale(.53)" />
      </g>
      <g data-mandap="lamps">
        <ellipse cx="252" cy="557" rx="39" ry="43" fill={`url(#${glow})`} />
        <ellipse cx="648" cy="557" rx="39" ry="43" fill={`url(#${glow})`} />
        <StandingDiya x={252} y={551} />
        <StandingDiya x={648} y={551} />
        <path d="M365 657Q450 632 535 657Q450 682 365 657Z" fill={c.blush} stroke={c.goldSoft} strokeWidth="1" />
        <path d="M383 658Q450 641 517 658Q450 675 383 658Z" fill="none" stroke={c.gold} strokeWidth=".85" />
        <path d="M412 650L421 631H479L488 650L479 661H421Z" fill={c.cream} stroke={c.goldInk} strokeWidth="1.2" />
        <path d="M421 636H479L483 646H417ZM420 653H481" fill={c.champagne} stroke={c.gold} strokeWidth="1.05" />
        <path d="M435 631C416 618 441 608 436 591C449 599 449 603 446 612C458 597 452 584 464 571C461 597 480 610 467 631Z" fill={c.goldSoft} stroke={c.gold} strokeWidth="1.2" />
        <path d="M444 632C435 623 450 612 453 603C454 616 466 622 458 632Z" fill={c.goldPale} stroke={c.gold} strokeWidth=".85" />
        <path d="M430 641L469 646M432 646L470 639" fill="none" stroke={c.goldInk} strokeWidth="2" strokeLinecap="round" />
        <path d="M338 669q8-7 15 0q-8 6-15 0ZM548 669q8-7 15 0q-8 6-15 0ZM387 685q9-8 18 0q-9 6-18 0ZM496 685q9-8 18 0q-9 6-18 0Z" fill={c.champagne} stroke={c.goldSoft} strokeWidth=".9" />
      </g>
      <g data-mandap="lights" fill={c.ivory} stroke={c.goldSoft} strokeWidth=".7">
        <circle cx="252" cy="539" r="2.4" />
        <circle cx="648" cy="539" r="2.4" />
        <circle cx="446" cy="571" r="1.6" />
        <circle cx="464" cy="553" r="1.3" />
      </g>
      <path d="M84 731Q200 739 296 731M603 731Q702 739 815 731" fill="none" stroke={c.goldSoft} strokeOpacity=".55" strokeWidth="1.25" />
    </svg>
  )
}

export function FloralSpray({ className, variant = 'jasmine' }: FloralSprayProps) {
  return (
    <svg className={artClass(className)} viewBox="0 0 300 440" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      {variant === 'marigold' ? (
        <>
          <path d="M86 428C120 354 125 296 156 234C178 187 174 135 201 71M119 324Q74 293 57 249M138 271Q199 266 237 225M163 214Q118 189 105 151M179 133Q228 126 245 93" fill="none" stroke={c.sage} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M123 187Q64 141 67 82" fill="none" stroke={c.sage} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M89 429Q134 347 147 279M159 236Q178 191 176 161" fill="none" stroke={c.gold} strokeWidth=".9" />
          {[
            [111, 366, -40, .85], [117, 340, 63, .84], [130, 302, -38, .77],
            [153, 246, 67, .72], [153, 235, -38, .71], [172, 183, 45, .65],
            [178, 136, -37, .63], [84, 285, -48, .56], [197, 258, 55, .57],
            [125, 193, -35, .51], [226, 121, 47, .45], [76, 121, -38, .43],
          ].map(([x, y, rotate, scale], i) => <Leaf key={i} x={x} y={y} rotate={rotate} scale={scale} pale={i % 4 === 1} />)}
          <path d="M198 86L184 69L202 72L213 60L210 81M53 257L38 247L52 245L62 233L66 252M102 159L89 153L103 142L118 147L114 161M234 235L220 224L232 215L248 220L246 233" fill={c.sage} fillOpacity=".65" stroke={c.sage} strokeWidth="1" />
          <MarigoldBloom transform="translate(204 58) rotate(9) scale(1.12)" />
          <MarigoldBloom transform="translate(67 66) rotate(-7) scale(.72)" />
          <MarigoldBloom transform="translate(104 137) rotate(-21) scale(.92)" />
          <MarigoldBloom transform="translate(57 238) rotate(16) scale(.91)" />
          <MarigoldBloom transform="translate(240 213) rotate(-12) scale(1.16)" />
          <MarigoldBloom transform="translate(248 80) rotate(37) scale(.61)" />
          <MarigoldBloom transform="translate(161 290) rotate(6) scale(.43)" />
          <path d="M161 304Q148 323 139 331" fill="none" stroke={c.sage} strokeWidth="1.1" />
        </>
      ) : variant === 'lotus' ? (
        <>
          <path d="M77 427C130 334 143 248 154 162M119 333Q178 309 219 246M105 364Q64 313 73 266M137 240Q111 213 95 174" fill="none" stroke={c.sage} strokeWidth="2" strokeLinecap="round" />
          <path d="M126 283Q80 248 55 192" fill="none" stroke={c.sage} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M83 428Q122 371 139 286" fill="none" stroke={c.gold} strokeWidth=".95" />
          <path d="M130 297C101 310 68 292 59 264C86 238 127 245 147 269L130 277L155 280Q153 291 130 297Z" fill={c.sage} fillOpacity=".35" stroke={c.sage} strokeWidth="1.2" />
          <path d="M133 278L73 263M129 277L91 248M125 279L83 284M132 278L129 255M123 280L119 296" fill="none" stroke={c.inkSoft} strokeOpacity=".45" strokeWidth=".8" />
          <path d="M155 346C173 324 210 319 236 340C231 366 191 375 167 362L183 350L155 346Z" fill={c.sage} fillOpacity=".28" stroke={c.sage} strokeWidth="1.1" />
          <path d="M180 350L230 341M181 351L206 329M181 353L215 364" fill="none" stroke={c.sage} strokeWidth=".8" />
          <path d="M130 327Q154 348 180 351" fill="none" stroke={c.sage} strokeWidth="1.2" />
          <Leaf x={108} y={370} rotate={-40} scale={.8} pale />
          <Leaf x={133} y={279} rotate={44} scale={.6} pale />
          <LotusBloom transform="translate(153 154) rotate(8) scale(1.15)" />
          <LotusBloom transform="translate(55 192) rotate(-17) scale(.67)" />
          <LotusBloom transform="translate(219 241) rotate(25) scale(.7)" />
          <path d="M74 269C55 254 58 235 69 219C85 234 90 252 74 269Z" fill={c.blushDeep} stroke={c.gold} strokeWidth="1.2" />
          <path d="M73 262Q65 240 69 223M74 268L62 259L66 275L78 273L87 259Z" fill={c.cream} stroke={c.gold} strokeWidth="1" />
          <path d="M94 181C81 169 86 154 96 141C108 158 110 172 94 181Z" fill={c.blush} stroke={c.gold} strokeWidth="1.1" />
          <path d="M95 178L85 173L93 185L104 176" fill={c.sage} fillOpacity=".5" stroke={c.sage} strokeWidth=".9" />
          <path d="M59 405Q94 401 109 397M39 414Q66 411 76 413" fill="none" stroke={c.goldSoft} strokeWidth="1" />
        </>
      ) : (
        <>
          <path d="M75 429C126 352 118 260 170 176C194 135 181 91 210 43M124 308Q79 294 56 242M142 236Q200 232 239 184M158 197Q104 165 91 119M189 110Q155 89 142 64M171 174Q222 149 245 119" fill="none" stroke={c.sage} strokeWidth="1.65" strokeLinecap="round" />
          <path d="M111 351Q63 350 51 326" fill="none" stroke={c.sage} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M78 430Q116 368 124 318M153 215Q175 180 181 156" fill="none" stroke={c.goldSoft} strokeWidth=".85" />
          {[
            [107, 370, -42, .86], [116, 339, 54, .8], [124, 291, -43, .72],
            [141, 241, 60, .7], [159, 190, -37, .61], [181, 143, 53, .66],
            [189, 96, -34, .54], [80, 283, -46, .59], [193, 220, 62, .6],
            [119, 168, -52, .58], [223, 145, 48, .49], [77, 344, -35, .5],
          ].map(([x, y, rotate, scale], i) => <Leaf key={i} x={x} y={y} rotate={rotate} scale={scale} pale={i % 3 === 2} />)}
          <JasmineBloom transform="translate(210 43) rotate(14) scale(.93)" />
          <JasmineBloom transform="translate(146 64) rotate(-21) scale(.71)" />
          <JasmineBloom transform="translate(89 115) rotate(12) scale(.87)" />
          <JasmineBloom transform="translate(246 117) rotate(25) scale(.72)" />
          <JasmineBloom transform="translate(239 183) rotate(-14) scale(.92)" />
          <JasmineBloom transform="translate(56 240) rotate(22) scale(.87)" />
          <JasmineBloom transform="translate(51 318) rotate(-18) scale(.73)" />
          <JasmineBloom transform="translate(172 268) rotate(-8) scale(.64)" />
          <path d="M143 285Q157 275 172 268M191 116Q216 91 225 86M122 178Q101 207 85 208" fill="none" stroke={c.sage} strokeWidth="1" />
          <path d="M225 88C215 77 219 67 229 62C234 72 235 84 225 88ZM86 211C77 212 69 204 70 192C82 192 90 201 86 211Z" fill={c.ivory} stroke={c.goldSoft} strokeWidth="1" />
          <path d="M222 88L227 91L231 83M82 209L88 214L90 205" fill="none" stroke={c.sage} strokeWidth="1.1" />
        </>
      )}
      <path d="M72 429L86 434M75 421L92 429" fill="none" stroke={c.gold} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function RouteTree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0-7C-28-8-37-30-22-46C-30-64-9-84 5-73C21-86 40-61 29-46C45-26 26-6 0-7Z" fill={c.sage} fillOpacity=".32" stroke={c.sage} strokeWidth="1.2" />
      <path d="M0 17V-57M0-13L-17-32M0-27L18-49M-1-39L-10-52" fill="none" stroke={c.sage} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M-17 19Q0 14 19 19" fill="none" stroke={c.goldSoft} strokeWidth=".9" />
    </g>
  )
}

export function RouteArt({ className }: ArtProps) {
  const id = useId()
  const lattice = `${id}-route-jali`
  const wash = `${id}-route-wash`
  return (
    <svg className={artClass(className)} viewBox="0 0 800 360" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={lattice} width="6" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0H6V8H0Z" fill={c.cream} />
          <path d="M0 4L3 0L6 4L3 8Z" fill="none" stroke={c.gold} strokeWidth=".65" />
        </pattern>
        <radialGradient id={wash}>
          <stop stopColor={c.champagne} stopOpacity=".62" />
          <stop offset="1" stopColor={c.ivoryDeep} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="176" cy="211" rx="147" ry="105" fill={`url(#${wash})`} />
      <ellipse cx="632" cy="200" rx="132" ry="111" fill={`url(#${wash})`} />
      <path d="M37 238Q164 217 287 239M510 235Q634 217 774 236" fill="none" stroke={c.goldSoft} strokeWidth="1.2" />
      <RouteTree x={77} y={216} scale={.79} />
      <RouteTree x={283} y={220} scale={.57} />
      <RouteTree x={526} y={219} scale={.6} />
      <RouteTree x={745} y={215} scale={.77} />
      <g strokeLinejoin="round">
        <path d="M106 226V152H153V133H207V153H254V226Z" fill={c.cream} stroke={c.gold} strokeWidth="1.25" />
        <path d="M101 151H158V160H101ZM203 151H259V160H203ZM150 130H210V139H150Z" fill={c.champagne} stroke={c.goldInk} strokeWidth="1.1" />
        <path d="M111 188H249V194H111M107 217H253" fill="none" stroke={c.goldSoft} strokeWidth="1.4" />
        <JaliWindow x={116} y={167} width={13} height={18} pattern={lattice} />
        <JaliWindow x={232} y={167} width={13} height={18} pattern={lattice} />
        <JaliWindow x={168} y={151} width={24} height={30} pattern={lattice} />
        <path d="M166 225V207Q180 187 194 207V225Z" fill={c.blushDeep} stroke={c.goldInk} strokeWidth="1.2" />
        <path d="M174 225V209Q180 200 186 209V225" fill="none" stroke={c.goldSoft} strokeWidth="1" />
        <Chhatri x={131} y={146} scale={.51} />
        <Chhatri x={230} y={146} scale={.51} />
        <path d="M150 130L157 123H203L210 130M158 123Q180 97 202 123M180 111V102" fill={c.goldPale} stroke={c.gold} strokeWidth="1.1" />
        <path d="M100 228H259V235H100M110 239H250" fill={c.ivoryDeep} stroke={c.gold} strokeWidth="1.2" />
        <path d="M570 221V158H688V221Z" fill={c.blushDeep} fillOpacity=".52" stroke={c.gold} strokeWidth="1.3" />
        <path d="M562 160L577 147H681L697 160Z" fill={c.champagne} stroke={c.goldInk} strokeWidth="1.25" />
        <path d="M574 145Q604 132 629 105Q654 132 684 145Z" fill={c.blush} stroke={c.gold} strokeWidth="1.3" />
        <path d="M629 106V91M625 99H633M607 141Q620 124 629 110Q638 124 651 141" fill="none" stroke={c.gold} strokeWidth="1" />
        {[591, 629, 667].map(x => (
          <g key={x}>
            <path d={`M${x - 12} 219V183q-2-8 5-10q1-9 7-10q6 1 7 10q7 2 5 10v36Z`} fill={c.ivoryDeep} stroke={c.goldInk} strokeWidth="1.1" />
            <path d={`M${x - 18} 172v48M${x + 18} 172v48`} fill="none" stroke={c.goldSoft} strokeWidth="2" />
          </g>
        ))}
        <path d="M562 220H696V228H562M552 230H707V238H552" fill={c.cream} stroke={c.gold} strokeWidth="1.2" />
        <path d="M570 155H689M566 225H693M559 235H701" fill="none" stroke={c.goldSoft} strokeWidth=".8" />
      </g>
      <path data-route-line="" pathLength="1" d="M205 268C272 301 318 311 361 276C395 248 376 219 351 233C320 250 361 312 431 306C503 300 524 250 588 267" fill="none" stroke={c.gold} strokeWidth="1.8" strokeDasharray=".012 .012" strokeLinecap="round" />
      {[{ x: 178, y: 259, number: '01' }, { x: 626, y: 259, number: '02' }].map(({ x, y, number }) => (
        <g key={number} transform={`translate(${x} ${y})`}>
          <path d="M0-24C6-19 10-21 16-16C21-10 19-6 24 0C19 6 21 10 16 16C10 21 6 19 0 24C-6 19-10 21-16 16C-21 10-19 6-24 0C-19-6-21-10-16-16C-10-21-6-19 0-24Z" fill={c.ivoryDeep} stroke={c.gold} strokeWidth="1.1" />
          <circle r="17.5" fill={c.goldPale} fillOpacity=".6" stroke={c.goldSoft} strokeWidth=".85" />
          <text x="0" y="5" textAnchor="middle" fontFamily="serif" fontSize="15" letterSpacing="1" fill={c.goldInk}>{number}</text>
        </g>
      ))}
      <path d="M45 263Q76 251 113 261M677 267Q718 250 758 263M459 326Q501 335 529 324" fill="none" stroke={c.goldSoft} strokeWidth=".95" strokeOpacity=".7" />
      <Leaf x={70} y={267} rotate={-50} scale={.46} />
      <Leaf x={73} y={269} rotate={50} scale={.38} pale />
      <Leaf x={721} y={270} rotate={-36} scale={.42} pale />
      <Leaf x={724} y={271} rotate={52} scale={.5} />
      <JasmineBloom transform="translate(464 319) rotate(15) scale(.37)" />
    </svg>
  )
}
