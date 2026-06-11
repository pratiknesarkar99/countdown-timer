# Countdown Timer

A clean, responsive countdown timer app built with React, Vite, and TypeScript. Track multiple upcoming events with live countdowns, persistent storage, and browser notifications.

**Live Demo:** [https://countdown-timer-one-virid.vercel.app/](https://countdown-timer-one-virid.vercel.app/)

---

## Features

- Add multiple named events with a date and optional time
- Live countdown display showing days, hours, minutes, and seconds
- Events persist across sessions via localStorage
- Browser notification when a countdown reaches zero
- Expired events auto-remove after 3 seconds
- Light and dark mode with preference saved across sessions
- Input validation with clear error messages
- Responsive layout down to mobile

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- TypeScript
- CSS custom properties for theming (no CSS framework)
- Native browser APIs only (no date libraries)

## Project Structure

```
src/
  components/
    EventForm.tsx         # Controlled form with validation
    CountdownCard.tsx     # Individual event card with auto-removal
    CountdownDisplay.tsx  # Segment display (days / hours / mins / secs)
  hooks/
    useCountdown.ts       # Core countdown logic with setInterval
    useTheme.ts           # Dark/light mode toggle with persistence
  styles/
    theme.css             # CSS variable tokens for dark and light themes
    base.css              # Reset, body, app layout
    header.css            # App header and theme toggle
    form.css              # Event form, inputs, labels, buttons
    card.css              # Event cards and remove button
    countdown.css         # Countdown segments and expired state
    utilities.css         # Empty state and responsive breakpoints
  types/
    index.ts              # Shared TypeScript interfaces
  utils/
    notifications.ts      # Browser notification helpers
    time.ts               # (Reserved for future time utilities)
```

## Getting Started

```bash
git clone https://github.com/your-username/countdown-timer.git
cd countdown-timer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Deployment

This project is deployed on Vercel. To deploy your own:

```bash
npm install -g vercel
vercel --prod
```

## Notes

- Time calculations use native JavaScript `Date` only, no external libraries
- Events more than 999 days in the future are rejected to keep the display clean
- If no time is specified, the event defaults to midnight on the selected date
- Browser notifications require permission, which is requested on first load