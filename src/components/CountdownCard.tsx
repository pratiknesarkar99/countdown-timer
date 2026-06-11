import { useCountdown } from '../hooks/useCountdown'
import CountdownDisplay from './CountdownDisplay'
import type { CountdownEvent } from '../types'

interface Props {
    event: CountdownEvent
}

export default function CountdownCard({ event }: Props) {
    const time = useCountdown(event.targetDate, event.name)

    return (
        <div className="event-card">
            <h3>{event.name}</h3>
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