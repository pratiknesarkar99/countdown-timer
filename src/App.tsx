import { useState } from 'react'
import EventForm from './components/EventForm'
import CountdownDisplay from './components/CountdownDisplay'
import type { CountdownEvent, TimeRemaining } from './types'

const staticTime: TimeRemaining = {
  days: 10,
  hours: 4,
  minutes: 32,
  seconds: 17,
  isExpired: false,
}

export default function App() {
  const [events, setEvents] = useState<CountdownEvent[]>([])

  function handleAdd(event: CountdownEvent) {
    setEvents(prev => [...prev, event])
  }

  return (
    <main className="app">
      <h1>Countdown Timer</h1>
      <EventForm onAdd={handleAdd} />

      {events.map(event => (
        <div key={event.id} className="event-card">
          <h3>{event.name}</h3>
          <CountdownDisplay time={staticTime} />
        </div>
      ))}
    </main>
  )
}