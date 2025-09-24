# Repository Guidelines

## Project Structure & Module Organization
- Core screens live in `app/` using Expo Router file-based routing; nested routes such as `app/(tabs)` map to bottom-tab stacks.
- Shared UI resides in `components/` (with `components/ui` for primitives) and reusable logic in `hooks/`.
- Configuration and constants stay in `constants/`, while data/service clients live under `lib/` (for example, `lib/supabase.ts` sourcing env keys).
- Static assets are stored in `assets/`; generated bundles land in `dist/` and should not be edited manually.
- `scripts/` hosts maintenance utilities such as `reset-project.js`; consult `app.json` and `expo-env.d.ts` for Expo configuration and types.

## Build, Test, and Development Commands
- `npm install` syncs dependencies.
- `npm run start` launches Expo Dev Server; use `npm run android`, `npm run ios`, or `npm run web` for platform-specific entry points.
- `npm run lint` runs `expo lint` with the shared ESLint config; treat warnings as actionable.
- `npm run reset-project` archives the current source into `app-example/` and rebuilds a blank scaffold.

## Coding Style & Naming Conventions
- TypeScript is mandatory; keep strict typing enabled and prefer explicit return types on hooks and utilities.
- Use 2-space indentation, kebab-case file names (for example, `themed-text.tsx`), and PascalCase React components.
- Import shared modules through the `@/` alias (`@/components/...`) rather than deep relative paths.
- Run the linter before committing; align fixes with `eslint-config-expo`.

## Testing Guidelines
- A formal test runner is not configured yet; when adding logic, include targeted tests (Jest with React Native Testing Library) or document manual QA steps in the PR.
- Keep feature flags and Supabase interactions mockable so the future test harness can stub them cleanly.

## Commit & Pull Request Guidelines
- Adopt Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) followed by a concise imperative summary.
- Every PR must link the relevant issue, describe changes, list validation steps (commands run, devices used), and attach UI screenshots or recordings for visual updates.
- Flag breaking API or schema changes in the PR title and description, and note any required environment variable updates.

## Environment & Security Notes
- Supabase credentials are read from `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`; never hardcode secrets or commit `.env` files.
- Review Expo release notes before bumping `expo` or `react-native`; align updates with OTA rollout plans.
