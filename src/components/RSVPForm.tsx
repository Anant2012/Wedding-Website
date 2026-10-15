import { useCallback, useState } from 'react'

type RSVPFormState = 'idle' | 'submitting' | 'success' | 'error'

export function RSVPForm() {
  const [state, setState] = useState<RSVPFormState>('idle')
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    attending: 'yes' as 'yes' | 'no' | '',
    partySize: '1',
    dietary: '',
  })
  const [errorMsg, setErrorMsg] = useState('')

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')

    if (!formData.guestName.trim()) {
      setErrorMsg('Please enter your name.')
      return
    }
    if (!formData.email.trim()) {
      setErrorMsg('Please enter your email address.')
      return
    }
    if (!formData.attending) {
      setErrorMsg('Please let us know if you can attend.')
      return
    }

    setState('submitting')

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setState('success')
        setFormData({
          guestName: '',
          email: '',
          phone: '',
          attending: '',
          partySize: '1',
          dietary: '',
        })
      } else {
        const error = await response.text()
        setErrorMsg(error || 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch (err) {
      setErrorMsg('Unable to submit your response. Please try again.')
      setState('error')
    }
  }, [formData])

  return (
    <section className="chapter chapter--rsvp" id="rsvp" aria-labelledby="rsvp-title">
      <div className="journey-wrap rsvp-layout">
        <header className="rsvp__heading" data-reveal>
          <h2 className="journey-title" id="rsvp-title">
            We'd love to<br /><em>have you there.</em>
          </h2>
          <p className="rsvp__subtitle">Please confirm your attendance by <strong>15 November 2026</strong></p>
        </header>

        {state === 'success' ? (
          <div className="rsvp__success" data-reveal>
            <svg className="rsvp__checkmark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
            <p className="rsvp__success-message">Thank you for your response!</p>
            <p className="rsvp__success-detail">
              {formData.attending === 'yes'
                ? `We can't wait to celebrate with you${formData.partySize !== '1' ? ` and your ${formData.partySize === '2' ? 'guest' : 'guests'}` : ''}.`
                : "We'll miss you. Thank you for letting us know."}
            </p>
          </div>
        ) : (
          <form className="rsvp__form" onSubmit={handleSubmit} data-reveal>
            <div className="rsvp__field">
              <label htmlFor="guestName" className="rsvp__label">Your name</label>
              <input
                id="guestName"
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                disabled={state === 'submitting'}
                required
              />
            </div>

            <div className="rsvp__field">
              <label htmlFor="email" className="rsvp__label">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={state === 'submitting'}
                required
              />
            </div>

            <div className="rsvp__field">
              <label htmlFor="phone" className="rsvp__label">Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={state === 'submitting'}
              />
            </div>

            <fieldset className="rsvp__fieldset">
              <legend className="rsvp__legend">Can you attend?</legend>
              <div className="rsvp__radio-group">
                <label className="rsvp__radio-label">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleInputChange}
                    disabled={state === 'submitting'}
                    required
                  />
                  <span>Yes, I'll be there</span>
                </label>
                <label className="rsvp__radio-label">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleInputChange}
                    disabled={state === 'submitting'}
                  />
                  <span>I can't attend</span>
                </label>
              </div>
            </fieldset>

            {formData.attending === 'yes' && (
              <>
                <div className="rsvp__field">
                  <label htmlFor="partySize" className="rsvp__label">How many guests?</label>
                  <select
                    id="partySize"
                    name="partySize"
                    value={formData.partySize}
                    onChange={handleInputChange}
                    disabled={state === 'submitting'}
                  >
                    <option value="1">Just me</option>
                    <option value="2">Me + 1 guest</option>
                    <option value="3">Me + 2 guests</option>
                    <option value="4">Me + 3 guests</option>
                  </select>
                </div>

                <div className="rsvp__field">
                  <label htmlFor="dietary" className="rsvp__label">Dietary requirements (optional)</label>
                  <textarea
                    id="dietary"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleInputChange}
                    disabled={state === 'submitting'}
                    placeholder="Let us know if you have any dietary restrictions"
                    rows={3}
                  />
                </div>
              </>
            )}

            {errorMsg && (
              <div className="rsvp__error" role="alert">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="rsvp__submit"
              disabled={state === 'submitting'}
              aria-busy={state === 'submitting'}
            >
              {state === 'submitting' ? (
                <>
                  <span className="rsvp__spinner" aria-hidden="true" />
                  Submitting
                </>
              ) : (
                <>
                  Confirm my response
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
