import { useEffect, useState } from 'react'

type CountdownValue = {
  days: string
  hours: string
  minutes: string
  seconds: string
  complete: boolean
}

const weddingTime = new Date('2026-12-03T00:00:00+05:30').getTime()
const pad = (value: number) => String(value).padStart(2, '0')

function calculateCountdown(): CountdownValue {
  const difference = weddingTime - Date.now()
  if (difference <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', complete: true }
  }

  const totalSeconds = Math.floor(difference / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    days: days < 100 ? pad(days) : String(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    complete: false,
  }
}

export function Countdown() {
  const [value, setValue] = useState(calculateCountdown)

  useEffect(() => {
    if (value.complete) return
    const timer = window.setInterval(() => setValue(calculateCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [value.complete])

  if (value.complete) {
    return <p className="count__done" id="count-done">Today, our forever begins.</p>
  }

  const units = [
    ['days', 'Days'],
    ['hours', 'Hours'],
    ['minutes', 'Minutes'],
    ['seconds', 'Seconds'],
  ] as const

  return (
    <div className="count" id="count" role="timer" aria-live="off">
      {units.map(([key, label]) => (
        <div className="count__unit" key={key}>
          <span className="count__num" data-cd={key}>{value[key]}</span>
          <span className="count__lab">{label}</span>
        </div>
      ))}
    </div>
  )
}
