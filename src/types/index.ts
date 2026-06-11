export interface CountdownEvent {
    id: string
    name: string
    targetDate: string  // ISO string, e.g. "2025-12-25T00:00:00"
}

export interface TimeRemaining {
    days: number
    hours: number
    minutes: number
    seconds: number
    isExpired: boolean
}