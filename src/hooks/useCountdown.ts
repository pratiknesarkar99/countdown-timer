import { useState, useEffect, useRef } from 'react'
import type { TimeRemaining } from '../types'
import { fireNotification } from '../utils/notifications'

function calculateTimeRemaining(targetDate: string): TimeRemaining {
    const now = new Date().getTime()
    const target = new Date(targetDate).getTime()
    const diff = target - now

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds, isExpired: false }
}

export function useCountdown(targetDate: string, eventName: string): TimeRemaining {
    const [time, setTime] = useState<TimeRemaining>(() =>
        calculateTimeRemaining(targetDate)
    )
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const hasNotified = useRef(false)

    useEffect(() => {
        if (time.isExpired) return

        intervalRef.current = setInterval(() => {
            const updated = calculateTimeRemaining(targetDate)
            setTime(updated)

            if (updated.isExpired) {
                if (intervalRef.current) clearInterval(intervalRef.current)
                if (!hasNotified.current) {
                    hasNotified.current = true
                    fireNotification(eventName)
                }
            }
        }, 1000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [targetDate, eventName])

    return time
}