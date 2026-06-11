import { useState } from 'react'
import type { CountdownEvent } from '../types'

interface Props {
    onAdd: (event: CountdownEvent) => void
}

export default function EventForm({ onAdd }: Props) {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        if (!name.trim()) {
            setError('Event name cannot be blank.')
            return
        }

        if (!date) {
            setError('Please enter a valid date.')
            return
        }

        const targetDate = time ? `${date}T${time}:00` : `${date}T00:00:00`
        const target = new Date(targetDate)

        if (isNaN(target.getTime())) {
            setError('The date or time entered is invalid.')
            return
        }

        if (target <= new Date()) {
            setError('Event must be in the future.')
            return
        }

        const msUntilEvent = target.getTime() - Date.now()
        const daysUntilEvent = msUntilEvent / (1000 * 60 * 60 * 24)

        if (daysUntilEvent > 999) {
            setError('Event is too far in the future. Maximum is 999 days.')
            return
        }

        onAdd({
            id: crypto.randomUUID(),
            name: name.trim(),
            targetDate,
        })

        setName('')
        setDate('')
        setTime('')
    }

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <h2>Add Event</h2>

            <div className="form-group">
                <label htmlFor="event-name">Event Name</label>
                <input
                    id="event-name"
                    type="text"
                    placeholder="e.g. My Birthday"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="event-date">Date</label>
                <input
                    id="event-date"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="event-time">Time (optional)</label>
                <input
                    id="event-time"
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Start Countdown</button>
        </form>
    )
}