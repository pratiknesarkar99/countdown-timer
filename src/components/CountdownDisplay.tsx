import type { TimeRemaining } from '../types'

interface Props {
    time: TimeRemaining
}

function Segment({ value, label }: { value: number; label: string }) {
    return (
        <div className="segment">
            <span className="segment-value">{String(value).padStart(2, '0')}</span>
            <span className="segment-label">{label}</span>
        </div>
    )
}

export default function CountdownDisplay({ time }: Props) {
    if (time.isExpired) {
        return <p className="expired-message">This event has passed!</p>
    }

    return (
        <div className="countdown-display">
            <Segment value={time.days} label="Days" />
            <Segment value={time.hours} label="Hours" />
            <Segment value={time.minutes} label="Minutes" />
            <Segment value={time.seconds} label="Seconds" />
        </div>
    )
}