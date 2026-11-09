# Redesign validation

- `npm ci` and `npm run build` (TypeScript + production bundle).
- Review the dashboard at mobile width and 1440px desktop width; check horizontal overflow.
- Complete a set: progress, session volume and streak update; automatic rest timer starts.
- Uncheck the only completed set: progress and volume reset; no phantom streak remains.
- Edit weight/repetitions, add/remove a set, collapse/expand an exercise and switch routines.
- Check history, calendar and preferences shortcuts.
- Timer: pause/resume, add 30s, background/foreground and finish alert.
- Cloud validation requires a configured Supabase environment and authenticated accounts; verify first-login hydration does not overwrite remote routines and deleting one session preserves other sessions from that day.
