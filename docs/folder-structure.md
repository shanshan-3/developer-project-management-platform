# Project folder structure

Suggested layout for the agreed JavaScript, React, Express, Prisma, and Supabase project. It keeps the existing `frontend/`, `backend/`, and `planning/` names.

Folders and files marked `[planned]` are suggestions, not existing implementation. This document does not create them. Add them when the corresponding feature needs them.

## Layout

```text
developer project management system/
|-- frontend/
|   |-- public/                       Static files served directly
|   |-- src/
|   |   |-- assets/                   Imported images and other assets
|   |   |-- components/ [planned]     Reusable interface components
|   |   |-- pages/ [planned]          Screen-level views
|   |   |-- lib/ [planned]            Shared API client and browser integrations
|   |   |-- App.jsx                   Root application component
|   |   |-- main.jsx                  React bootstrap
|   |   |-- App.css
|   |   `-- index.css
|   |-- .env.example [planned]        Names of required public environment variables
|   |-- .gitignore
|   |-- eslint.config.js              Existing ESLint configuration
|   |-- index.html
|   |-- package.json
|   |-- package-lock.json
|   |-- README.md
|   `-- vite.config.js
|-- backend/
|   |-- src/ [planned]
|   |   |-- routes/                   HTTP endpoints
|   |   |-- middleware/               Authentication, authorization, and request errors
|   |   |-- services/                 Domain operations and database transactions
|   |   `-- lib/                      Shared database and provider clients
|   |-- prisma/ [planned]
|   |   |-- schema.prisma             Application data model
|   |   `-- migrations/               Prisma-generated application-table migrations
|   |-- tests/ [planned]
|   |   `-- integration/              HTTP API checks using isolated PostgreSQL data
|   |-- .env.example [planned]        Names of required server environment variables
|   |-- package.json
|   |-- package-lock.json
|   `-- server.js                     Existing Express startup entry point
|-- supabase/ [planned]
|   `-- migrations/                   SQL for Realtime policies and retention jobs
|-- tests/ [planned]
|   `-- e2e/                          Browser workflows and live collaboration checks
|-- docs/ [planned]
|   `-- adr/                          Architecture decisions as they are recorded
|-- planning/
|   |-- developer-project-management-roadmap.md
|   `-- developer-project-management-spec.md
|-- .gitignore [planned]              Root ignores for dependencies, output, and secrets
`-- folder-structure.md               This document
```

Dependency folders such as `node_modules/`, generated build output, and `.git/` are omitted from the tree.

## Where to put code

| Location | Responsibility |
|---|---|
| `frontend/src/pages/` | Account, workspace, project board/list, task-detail, and notification views. |
| `frontend/src/components/` | Shared buttons, inputs, dialogs, navigation, and other reusable controls. Keep components used by only one page beside that page. |
| `frontend/src/lib/` | Shared calls to the Express API, Supabase Auth integration, and private live subscriptions. |
| `backend/src/routes/` | Request validation and HTTP responses for accounts, workspaces, projects, tasks/comments, and notifications as needed. |
| `backend/src/middleware/` | Validated identity, current membership/role checks, and shared request error handling. Resource-specific permissions still belong with the relevant operation. |
| `backend/src/services/` | Invitations, project access, task changes, comments, notifications, restoration, and their transactions. Split by domain only when code exists to justify it. |
| `backend/src/lib/` | Shared Prisma and email/live provider clients, with server-only credentials. |
| `backend/prisma/` | Application tables and their Prisma migration history. |
| `supabase/migrations/` | Reviewed SQL for Realtime authorization and scheduled retention. Do not use it to maintain a competing migration history for application tables. |
| `backend/tests/integration/` | API permission, transaction, assignment, archive, invitation, and retention checks. |
| `tests/e2e/` | User-facing onboarding, board/list consistency, notifications, keyboard use, and two-browser collaboration checks. |
| `docs/adr/` | Recorded architectural decisions. Add documents only when decisions need recording. |
| `planning/` | The approved roadmap and implementable specification. |

## Conventions

- Use JavaScript for application code and JSX for React components. Prisma schema and SQL migrations use their own formats.
- Keep `backend/server.js` in place so the current `dev` and `start` scripts continue to work. Import routes and other modules as they are implemented.
- Use the existing frontend ESLint configuration. Backend lint configuration remains implementation work.
- Keep application data reads/writes behind Express and Prisma. Frontend authentication and live subscriptions do not grant direct access to application tables.
- Example environment files contain variable names and safe placeholders only. Actual environment files, database credentials, and service keys must be ignored by Git; server secrets must never enter frontend code.
- Preserve the confirmed MVP. Do not add folders for AI, social sign-in, billing, or other deferred features.
- Add feature subfolders when a page or module grows enough to need them. No separate controllers, repositories, shared package, or generic utility layer is required by this layout.

## Status

React/Vite, frontend ESLint, and an Express starter already exist. Prisma, Supabase integration, migrations, test tooling, and the proposed folders are not configured by this document. The specification's testing seams still await confirmation.

Issue-tracker setup remains pending. No `.scratch/` tracker or agent instruction file is selected by this layout.
