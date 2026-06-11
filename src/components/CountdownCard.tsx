import { useEffect } from 'react'
import { useCountdown } from '../hooks/useCountdown'
import CountdownDisplay from './CountdownDisplay'
import type { CountdownEvent } from '../types'

interface Props {
    event: CountdownEvent
    onRemove: (id: string) => void
}

export default function CountdownCard({ event, onRemove }: Props) {
    const time = useCountdown(event.targetDate, event.name)

    useEffect(() => {
        if (time.isExpired) {
            const timeout = setTimeout(() => onRemove(event.id), 3000)
            return () => clearTimeout(timeout)
        }
    }, [time.isExpired])

    return (
        <div className={`event-card ${time.isExpired ? 'expired' : ''}`}>
            <div className="event-card-header">
                <h3>{event.name}</h3>
                <button
                    className="remove-btn"
                    onClick={() => onRemove(event.id)}
                    aria-label="Remove event"
                >
                    ✕
                </button>
            </div>
            <p className="event-target-date">
                {new Date(event.targetDate).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                })}
            </p>
            <CountdownDisplay time={time} />
        </div>
    )
}