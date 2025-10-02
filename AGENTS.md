# Repository Guidelines
# Metadata
- Agent Spec Version: 1.0.0
- Maintainer: @tj
- Last Updated: 2025-10-02
## Purpose & Scope
- Purpose: Help develop an employee mobile app using Expo + Supabase stack by scaffolding code, refactoring, maintaining migrations, writing tests, and documentation.

- In-scope: UI scaffolding, Expo Router navigation, Supabase client integration, OTP auth, Storage uploads, Offline cache, Notifications, utilities, lint/test/CI setup.

- Out-of-scope: Handling secrets, payment systems, financial integrations, or running unsafe shell commands

## Project Structure & Module Organization
- Core screens live in `app/` using Expo Router file-based routing; nested routes such as `app/(tabs)` map to bottom-tab stacks.
- Shared UI resides in `components/` (with `components/ui` for primitives) and reusable logic in `hooks/`.
- Configuration and constants stay in `constants/`, while data/service clients live under `lib/` (for example, `lib/supabase.ts` sourcing env keys).
- Static assets are stored in `assets/`; generated bundles land in `dist/` and should not be edited manually.
- `scripts/` hosts maintenance utilities such as `reset-project.js`; consult `app.json` and `expo-env.d.ts` for Expo configuration and types.

## Tech Requirements & Constraints
- Language: TypeScript (strict mode)
- UI: NativeWind version 4.0 + gluestack-ui + expo/vector-icons
- State: Zustand (UI state), TanStack Query (server state)
- Forms: React Hook Form + Zod
- Offline: TanStack Query Persist + MMKV/SQLite (retry queue)
- Supabase: All tables must have RLS enabled; Storage must use signed URLs
- Navigation: Expo Router (file-based)
- CI/CD: GitHub Actions + EAS Build/Submit
Constraints:
- Never hardcode secrets; always use .env or EAS Secrets.

## Build, Test, and Development Commands    
- `npm install` syncs dependencies.
- `npm run start` launches Expo Dev Server; use `npm run android`, `npm run ios`, or `npm run web` for platform-specific entry points.
- `npm run lint` runs `expo lint` with the shared ESLint config; treat warnings as actionable

## Coding Style & Naming Conventions
- TypeScript is mandatory; keep strict typing enabled and prefer explicit return types on hooks and utilities.
- Use 2-space indentation, kebab-case file names (for example, `themed-text.tsx`), and PascalCase React components.
- Import shared modules through the `@/` alias (`@/components/...`) rather than deep relative paths.
- Run the linter before committing; align fixes with `eslint-config-expo`.

## Safety Rules
- The agent may run npm, npx, or scripts from package.json.
- Any external shell command must go through PLAN → DIFF → APPROVE workflow.
- Network calls beyond Supabase must be approved.
- Never commit .env* files.

## Agent Workflow (Loop)

- PLAN: List all steps in plain text.
- DIFF: Show file changes before applying.
- APPLY: Apply changes only after approval.
- TEST: Run npm run typecheck && npm run lint && npm test.
- DOCS: If multiple files were touched, update Agent Changelog below.

## Agent Changelog
### Always log here after significant changes so the agent can re-sync.
- 2025-10-02: v1.0.0 Initial version. 
- 2025-10-02: Established dark theme defaults across navigation, auth, and home/services UI.
- 2025-10-02: Refined login flow with NativeWind/GlueStack UI + React Hook Form + Zod validation.
- 2025-10-02: Upgraded OTP verification screen with GlueStack layout and schema-driven validation.
- 2025-10-02: Styled profile tab with QR placeholder and demo details using GlueStack primitives.

 <!-- ## Testing & QA
  - No automated tests yet; add focused Jest + React Native Testing
  Library coverage for new logic, or document manual QA steps clearly.
  - Keep Supabase calls mock-friendly (export functions from modules
  rather than inlining client access inside components).
  - Record manual scenarios (e.g., OTP happy path, invalid code, logout)
  when touching auth. -->

## Commit & Pull Request Guidelines
- Adopt Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) followed by a concise imperative summary.
- Every PR must link the relevant issue, describe changes, list validation steps (commands run, devices used), and attach UI screenshots or recordings for visual updates.
- Flag breaking API or schema changes in the PR title and description, and note any required environment variable updates.

## Environment & Security Notes
- Supabase credentials are read from `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`; never hardcode secrets or commit `.env` files.
- Review Expo release notes before bumping `expo` or `react-native`; align updates with OTA rollout plans.

## Do’s and Don’ts

- Do: Use PLAN → DIFF → APPLY, conventional commits, run tests, update docs. 
- Don’t: Commit secrets, disable RLS, deviate from Expo Router, refactor without approval. 
- Don't add bg-colors border-colors etc. just use gluestack components
