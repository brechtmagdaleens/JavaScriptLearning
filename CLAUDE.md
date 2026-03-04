# CLAUDE.md

This file provides guidance for AI assistants (like Claude) working in this repository.

## Repository Overview

**JavaScriptLearning** is a personal learning repository for exploring JavaScript concepts.
It is a minimal, beginner-oriented project with no framework dependencies, build tools,
or test infrastructure — by design.

- **Created:** 2012 by brechtmagdaleens
- **Purpose:** Learning JavaScript through hands-on practice
- **Current state:** Skeleton repository — no source files yet

## Repository Structure

```
JavaScriptLearning/
├── CLAUDE.md        # This file
├── README.md        # Brief project description
└── .gitignore       # Ignore rules (currently targets Java artifacts)
```

As JavaScript files and exercises are added, they should follow the conventions below.

## Development Philosophy

- Keep things **simple and educational** — favor readability over cleverness
- No build tools, bundlers, or transpilers unless explicitly introduced as a learning topic
- Each file or folder should focus on a single concept or topic
- Prefer vanilla JavaScript; introduce libraries only when they are the learning subject

## Conventions

### File Naming

- Use `camelCase` for JavaScript files (e.g., `closures.js`, `asyncAwait.js`)
- Use descriptive names that reflect the concept being explored
- Group related exercises in folders named after the topic (e.g., `arrays/`, `promises/`)

### Code Style

Since there is no linter or formatter configured yet:

- Use 2-space indentation
- Use `const`/`let` — avoid `var`
- Prefer arrow functions for callbacks
- Add brief comments explaining **why** non-obvious code works the way it does
- Keep examples short and self-contained

### Suggested Directory Layout (as the repo grows)

```
JavaScriptLearning/
├── basics/           # Variables, types, operators, control flow
├── functions/        # Declarations, expressions, closures, higher-order
├── arrays/           # map, filter, reduce, spread, destructuring
├── objects/          # Prototypes, classes, destructuring
├── async/            # Callbacks, promises, async/await
├── dom/              # Browser DOM manipulation (if applicable)
└── exercises/        # Problem-solving practice files
```

## Git Workflow

- The default branch is `master`
- Feature/documentation branches follow the pattern: `claude/<description>-<id>`
- Commit messages should be short and descriptive (e.g., `add closure examples`)
- Avoid committing build artifacts or editor-specific files

## .gitignore Notes

The current `.gitignore` targets Java artifacts (`.class`, `.jar`, `.war`, `.ear`).
When JavaScript tooling is added, extend it with:

```
node_modules/
dist/
.env
*.log
.DS_Store
```

## No Test Infrastructure (Yet)

There is currently no test runner configured. If tests are introduced:

- Prefer **Jest** for unit testing JavaScript
- Place test files alongside source files as `<name>.test.js`
- Run with `npm test` once a `package.json` is in place

## Adding npm / package.json

If npm is introduced, initialise with:

```bash
npm init -y
```

Then update this file with the available scripts and any dependencies.

## Key Contacts

- Repository owner: brechtmagdaleens (brecht.magdaleens@gmail.com)
