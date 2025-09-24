# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo SDK 54. The project uses file-based routing with expo-router and supports iOS, Android, and web platforms.

## Development Commands

- `npm install` - Install dependencies
- `npm start` or `npx expo start` - Start the development server
- `npm run android` - Start with Android emulator
- `npm run ios` - Start with iOS simulator
- `npm run web` - Start web version
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset to blank project structure

## Architecture

### File Structure
- `app/` - File-based routing using expo-router
  - `_layout.tsx` - Root layout with navigation theme provider
  - `(tabs)/` - Tab-based navigation group
    - `_layout.tsx` - Tab layout configuration
    - `index.tsx` - Home tab screen
    - `explore.tsx` - Explore tab screen
  - `modal.tsx` - Modal screen
- `components/` - Reusable UI components
  - `ui/` - Core UI components (IconSymbol, Collapsible)
  - Theme-aware components (ThemedText, ThemedView)
  - Custom components (HapticTab, ParallaxScrollView)
- `hooks/` - Custom React hooks
  - `use-color-scheme.ts` - Color scheme detection (with web variant)
  - `use-theme-color.ts` - Theme color utilities
- `constants/` - Application constants and theme definitions
- `assets/` - Static assets (images, fonts)

### Navigation Structure
- Stack navigator at root level with tab group as main screen
- Tab navigation with Home and Explore screens
- Modal presentation for overlay screens
- Uses `@react-navigation/native` with expo-router integration

### Theming
- Automatic light/dark theme support using `@react-navigation/native` themes
- Custom themed components that adapt to color scheme
- Theme colors defined in `constants/theme`
- Platform-specific color scheme detection

### Key Technologies
- **Expo SDK 54** with new architecture enabled
- **expo-router** for file-based routing with typed routes
- **React Navigation** for navigation primitives
- **React Native Reanimated** for animations
- **React Native Gesture Handler** for gesture support
- **TypeScript** with strict mode enabled
- **ESLint** with Expo configuration

### Configuration
- `app.json` - Expo configuration with platform-specific settings
- `tsconfig.json` - TypeScript config with path aliases (`@/*`)
- `eslint.config.js` - ESLint flat config with Expo rules
- Path alias `@/*` resolves to project root

### Development Notes
- Uses React 19.1.0 with React Native 0.81.4
- New Architecture (Fabric/TurboModules) enabled
- React Compiler experiment enabled
- Typed routes experiment enabled for better type safety
- Platform-specific file extensions supported (`.ios.tsx`, `.web.ts`)