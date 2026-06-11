import { useState } from 'react'
import EventForm from './components/EventForm'
import CountdownCard from './components/CountdownCard'
import type { CountdownEvent } from './types'

export default function App() {
  const [events, setEvents] = useState<CountdownEvent[]>([])

  function handleAdd(event: CountdownEvent) {
    setEvents(prev => [...prev, event])
  }

  return (
    <main className="app">
      <h1>Countdown Timer</h1>
      <EventForm onAdd={handleAdd} />

      {events.length === 0 && (
        <p className="empty-state">No events yet. Add one above.</p>
      )}

      {events.map(event => (
        <CountdownCard key={event.id} event={event} />
      ))}
    </main>
  )
}