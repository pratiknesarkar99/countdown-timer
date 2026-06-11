import { useState, useEffect } from 'react'
import EventForm from './components/EventForm'
import CountdownCard from './components/CountdownCard'
import type { CountdownEvent } from './types'
import { requestNotificationPermission } from './utils/notifications'

const STORAGE_KEY = 'countdown-events'

function loadEvents(): CountdownEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed: CountdownEvent[] = JSON.parse(stored)
    // Filter out events that have already expired
    return parsed.filter(e => new Date(e.targetDate).getTime() > Date.now())
  } catch {
    return []
  }
}

function saveEvents(events: CountdownEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

export default function App() {
  const [events, setEvents] = useState<CountdownEvent[]>(loadEvents)

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    saveEvents(events)
  }, [events])

  function handleAdd(event: CountdownEvent) {
    setEvents(prev => [...prev, event])
  }

  function handleRemove(id: string) {
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  return (
    <main className="app">
      <h1>Countdown Timer</h1>
      <EventForm onAdd={handleAdd} />

      {events.length === 0 && (
        <p className="empty-state">No events yet. Add one above.</p>
      )}

      {events.map(event => (
        <CountdownCard key={event.id} event={event} onRemove={handleRemove} />
      ))}
    </main>
  )
}