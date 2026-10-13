# Developer Project Management Platform: Implementation Specification

Specification date: 2026-10-13.

Status: Local specification drafted from the approved Wayfinder roadmap. Testing seams await user confirmation under to-spec. Issue-tracker publication is blocked by missing tracker configuration. Hosting, email, live transport, recovery, and public capacity retain the roadmap's validation gates.

## Problem Statement

Small developer teams need a shared place to organize their own projects, assign work, discuss tasks, and see progress as teammates make changes. Workspace membership must not expose every project. Teams also need management oversight, recovery from accidental task removal, and reliable access across disconnected sessions.

The platform must remain free for everyone, with no subscriptions or paid plans, using free hosting services. A small team pilot must establish that permissions, collaboration, recovery, and operating capacity work before registration opens publicly.

## Solution

Provide verified email/password accounts, workspaces, selected-access projects, and shared tasks. Workspace owners/admins oversee every project within their workspace. Any workspace member can create a project, become its manager, and add existing workspace members.

Project collaborators manage the same tasks through board and list views, using four fixed statuses and one optional assignee. They comment, filter work, and see project progress. Connected authorized teammates receive live updates; relevant recipients retain in-app notifications while offline.

Management archives projects as read-only history. Authorized users trash tasks, management restores them before a 30-day cutoff, and scheduled cleanup permanently removes expired tasks and associated comments. Pilot evidence gates a free public launch. Social sign-in and AI assistance remain later, separately gated work.

The approved roadmap contains both user-confirmed choices and explicitly marked assumptions. This specification preserves that distinction; approval of the roadmap is not treated as confirmation of every proposed default or as authorization to implement.

## User Stories

Each story describes behavior already included or proposed in the roadmap. Stories marked **Proposed default** retain the roadmap's assumption status.

1. As a developer, I want to register with email and password, so that I can use the platform with my own account.
2. As a developer, I want to verify my email address, so that account and invitation access use an address I control.
3. As a developer, I want to sign in and sign out, so that I can control access to my session.
4. As a developer, I want to reset my password through account email, so that I can recover access.
5. As a developer, I want minimal display-name settings, so that teammates can identify me.
6. As a developer, I want to create a workspace as its owner, so that my team has a shared project space.
7. As a developer in multiple workspaces, I want to switch workspaces without mixing their private content, so that I can collaborate with different teams safely. **Proposed default: multiple workspace membership.**
8. As a workspace owner or admin, I want to view the roster, so that I can manage who belongs to the workspace.
9. As a workspace owner, I want to appoint admins and transfer ownership, so that the team can continue when responsibilities change. **Proposed default: one owner and ownership transfer.**
10. As a workspace owner, I want final-owner protections, so that the workspace cannot lose accountable ownership. **Proposed default.**
11. As a workspace owner or admin, I want to invite a specific email address, so that the intended teammate can join.
12. As an invited developer, I want to register or sign in with the verified invited address and accept once, so that I join the correct workspace.
13. As an invited developer, I want a clear outcome for wrong-address, unverified, expired, revoked, or reused invitations, so that failed acceptance does not grant unintended access.
14. As a workspace owner or admin, I want to revoke or resend invitations, so that I can correct onboarding problems. **Proposed default: seven-day expiry and resend invalidating the previous token.**
15. As a workspace owner or admin, I want delivery failure to be visible without creating duplicate membership, so that I can recover an unsuccessful invitation.
16. As a workspace owner or admin, I want to remove workspace members, so that departed teammates lose associated project access.
17. As a workspace member, I want to create a project and become its manager, so that I can start work without waiting for an administrator.
18. As a project manager, I want to add existing workspace members to my project, so that only selected teammates join the work.
19. As a workspace member, I want to see only projects I have joined, so that private projects remain restricted.
20. As a workspace owner or admin, I want access to every project in my workspace, so that I can oversee and recover team work.
21. As a project collaborator, I want management oversight to be explained in membership settings, so that I understand who can access the project.
22. As a project manager, I want to manage my project's settings and membership, so that I can organize collaboration without administering the entire workspace.
23. As workspace management, I want to replace a departed project manager, so that projects can continue.
24. As a project collaborator, I want to create tasks with title, description, status, priority, an optional due date, and one optional assignee, so that work has clear context and responsibility.
25. As a project collaborator, I want to edit and assign tasks, so that teammates can maintain the shared plan.
26. As a project collaborator, I want assignees limited to current project members, so that work is not assigned to someone outside the project. **Proposed default: explicit membership also required for owners/admins.**
27. As a project collaborator, I want to move tasks through To do, In progress, In review, and Done, so that the team shares a consistent workflow.
28. As a project collaborator, I want board and list views of the same saved tasks, so that I can choose the useful view without splitting records.
29. As a project collaborator, I want to filter by status, assignee, priority, or due date, so that I can find relevant work.
30. As a project collaborator, I want project completion counts and percentage, so that I can assess progress. **Proposed default: Done divided by all non-trashed tasks.**
31. As a project collaborator, I want an empty project to show No tasks, so that it does not imply completed work. **Proposed default.**
32. As a project collaborator, I want to comment on tasks, so that discussion stays with the work. **Proposed default: flat plain-text comments.**
33. As a comment author, I want to edit my comments, so that I can correct their content. **Proposed default.**
34. As a comment author or project management user, I want to remove comments within my permissions, so that I can correct or manage the discussion. **Proposed default.**
35. As a project collaborator, I want conflicts with newer task revisions to be reported, so that my stale edit does not silently overwrite someone else's change.
36. As a project collaborator, I want failed saves and board moves to show the saved state with feedback, so that I know which changes succeeded.
37. As a connected project collaborator, I want saved task and comment changes to appear without manual refresh, so that I stay current with teammates.
38. As a returning or reconnecting project collaborator, I want current saved state and unread counts to reload, so that missed events do not leave stale work onscreen.
39. As a project collaborator, I want connection failure to be visible with manual refresh available, so that I can recover while live delivery is unavailable.
40. As a relevant task participant, I want persistent in-app notifications, so that activity remains available when I was offline. **Proposed default: recipient rules specified below.**
41. As a notification recipient, I want an unread count, notification list, and read/read-all actions, so that I can track activity I have seen.
42. As a notification recipient, I want repeated delivery and my own actions to avoid duplicate or self-notifications, so that the list reflects useful activity. **Proposed default.**
43. As a user whose access is removed, I want affected private content cleared and future reads denied, so that the current permission state is enforced even with an open connection.
44. As project management, I want to archive a project as read-only history, so that completed work remains available without edits.
45. As project management, I want to unarchive a project, so that authorized work can resume. **Proposed default.**
46. As a task creator with current project access, I want to trash my task, so that I can recover from creating unwanted work.
47. As project management, I want to trash any task in my managed scope, so that I can manage project work.
48. As project management, I want to restore a trashed task before its 30-day cutoff with its comments and previous status, so that mistaken removal can be reversed.
49. As a project collaborator, I want departed assignees to become unassigned, so that tasks retain valid responsibility.
50. As project management, I want trash expiry dates and rejection at or after expiry, so that the recovery deadline is clear even if cleanup has not yet run.
51. As a team member, I want expired trashed tasks and comments permanently removed, so that the agreed retention limit is enforced.
52. As a developer following an inaccessible task or notification link, I want a neutral unavailable state, so that restricted or removed content is not exposed.
53. As a keyboard user, I want status changes and collaboration controls to work without dragging, so that I can complete the same workflow.
54. As a developer on a narrow screen, I want usable responsive board/list and task flows, so that I can access core collaboration from the web.
55. As a project collaborator, I want clear loading, empty, error, conflict, archived, and forbidden states, so that I understand the current outcome.
56. As a pilot team, I want to complete onboarding, private project collaboration, notifications, and recovery, so that the platform is validated through actual use.
57. As the service operator, I want measured database, email, runtime, and live-transport usage, so that public admission is based on free capacity.
58. As the service operator, I want repeatable off-site exports and demonstrated restoration, so that an outage need not destroy team work.
59. As a public developer after the launch gates pass, I want free verified-email registration and workspace creation, so that I can use the platform without subscribing.
60. As a developer, I want clear temporary quota or service-exhaustion outcomes, so that I can understand interruptions without losing saved work or being enrolled in a paid service.

## Implementation Decisions

### Confirmed scope and stack

- Build a greenfield application in JavaScript, with React for the frontend, Node.js/Express for the backend, Prisma for application data access, Supabase PostgreSQL for storage, and Supabase Auth for email/password accounts. Supabase PostgreSQL supersedes the earlier MySQL choice.
- Implement workspace roles of owner, admin, and member, with selected-access projects. Any workspace member may create a project and becomes its manager. Workspace membership and project membership are distinct.
- Include accounts, invitations, private projects, core task collaboration, board/list views, filters, progress, live task/comment changes, persistent in-app notifications, archives, trash, and 30-day retention in the launch work.
- Use only To do, In progress, In review, and Done. Support one optional assignee. Task fields are title, description, status, priority, optional due date, and optional assignee.
- Start with a controlled small team pilot, followed by free public registration after the operating gates pass. No billing or paid-service fallback is authorized.

### Logical modules and ownership

- Account/session handling integrates Supabase Auth with frontend account flows and validated server identity. Minimal profile data links to the Supabase Auth ID.
- Workspace/membership handling owns workspace creation, roster, roles, invitations, acceptance, removal, and the proposed owner protections.
- Project/access handling owns creation, settings, selected membership, manager replacement, archive state, and authorization shared by all project operations.
- Task/comment handling owns task validation, revisions, assignment, status transitions, comments, queries, progress, trash, and restoration.
- Notification/live delivery handling owns durable notification rows, recipient resolution, private invalidations, retries, reconnect recovery, and unread state.
- Retention/operations handling owns scheduled purge, exports/restoration evidence, capacity measurement, and release gates. These are responsibilities, not a requirement to introduce a separate service or wrapper for each one.

### Permission contract

Task/comment writes require an active project; project actions require current workspace membership. Archive/unarchive and system retention are handled separately. Management means the workspace owner/admin for projects in that workspace, or the manager of the particular project.

| Action | Workspace owner/admin | Project manager | Project member | Other workspace member |
|---|---|---|---|---|
| Read project contents | All projects in own workspace | Managed project | Joined project | Denied |
| Create a project | Yes | Yes as workspace member | Yes as workspace member | Yes; becomes its manager |
| Invite/remove workspace members | Yes, subject to owner protections | No from project role | No | No |
| Manage project settings/members | Yes | Managed project | No | No |
| Create/edit/assign tasks, change status, comment | Yes | Yes | Yes | Denied |
| Trash a task | Any task in own workspace | Any task in managed project | Own-created task only | Denied |
| Restore tasks; archive/unarchive | Yes | Managed project | No | Denied |

- Check current persisted roles and membership for every request. Project manager authority never grants workspace administration. Authorization must scope lists, details, progress, filters, notifications, and mutations, including requests containing cross-workspace IDs.
- A task creator's trash permission ends when project access ends. Workspace removal removes associated project access and unassigns affected tasks transactionally. Managers can be replaced through owner/admin oversight.
- Archive state denies task/comment writes for all roles. Unarchive before restoring a task. Scheduled retention continues for archived projects.
- Proposed defaults retained from the roadmap: one workspace owner; multiple workspaces per user; owner appointment of admins and transfer of ownership; no final-owner removal/departure without transfer; admins cannot transfer ownership or appoint themselves owner; assignment requires explicit project membership even for owners/admins.

### Data contracts and trust boundaries

- Proposed records are profile, workspace, workspace membership, invitation, project, project membership with manager/member role, task, comment, notification, and a small durable delivery record where retries require it.
- Enforce unique memberships, referential integrity, project membership within the same workspace, and assignment to a current member of the task's project. Membership removal and related task unassignment must be atomic.
- Derive identity from a validated Supabase token/session. Reject forged identity, browser-supplied role claims, unauthorized resource IDs, and invalid input at the API boundary.
- Keep application data reads/writes behind Express and Prisma. Disable the application Data API or deny direct browser access to application tables. Prisma access does not implicitly inherit a browser user's RLS permissions. Keep database and service credentials server-only.
- Supabase owns Auth tables; Prisma migrations own application tables; reviewed SQL migrations own Realtime policies and retention jobs. Avoid competing migration histories.
- API responses expose only authorized persisted data. Unauthorized or unavailable links must not disclose titles, descriptions, comments, counts, search results, or sensitive notification content.
- Paginate task, comment, and notification queries. Index membership, project, assignee, and unread lookups. Bound inputs and requests; numeric limits remain unconfirmed until setup/pilot evidence supports them.
- Mutations report validation, authorization, conflict, and delivery outcomes distinctly. A failed post-commit broadcast must not make a saved mutation appear unsaved. No exact endpoint names or response envelope have been agreed; settle these shared contracts during implementation without changing behavior.

### Accounts and invitations

- Include signup, email verification, sign-in/out, password reset, and minimal display-name settings. Restrict pilot admission before enabling public registration.
- Invitations belong to one workspace and one specific email address. Acceptance requires the verified invited address; normalize addresses without stripping provider-specific dots or aliases.
- Store invitation token hashes. Accept transactionally and repeat-safely; repeated acceptance must not create duplicate membership. Joining a workspace does not automatically join any project.
- Handle wrong or unverified address, expiry, revocation, reuse, already-existing membership, sender failure, and resend abuse. Display delivery failure and allow recovery without duplicate membership.
- Seven-day expiry, revoke/resend operations, and resend invalidation of the previous token are proposed operational defaults, not newly confirmed decisions.

### Tasks, comments, views, and progress

- Project collaborators share task creation, editing, assignment, status changes, and comments within the permission contract. Management-only settings and membership controls remain restricted.
- Board and list views read the same task records; task details and filters stay consistent with saved changes. Filter by status, assignee, priority, or due date.
- Use a task revision to reject stale edits with a conflict response. A failed board move returns to saved state with feedback. Keyboard-accessible status controls are required; drag-and-drop is optional convenience.
- Proposed defaults: Low/Medium/High priorities, date-only due dates, flat plain-text task comments, comment-author editing, and removal by the author or project management. Comment edit history is outside launch scope.
- Proposed progress formula: Done tasks divided by all non-trashed tasks. Empty projects show No tasks. Archived projects retain readable history.
- The roadmap's personal task list is a possible reuse of authorized assignment queries, not a required additional view in this MVP. It is not promoted into a new feature by this specification.

### Live updates and notifications

- Live updates remain the primary collaboration mechanism. The proposed transport is Supabase Realtime private Broadcast, one channel per authenticated user, subject to Phase 1 validation.
- Private receive policies bind the channel to authenticated identity. Browsers cannot publish authoritative changes. Express publishes minimal ID/invalidation signals after commit; the client refetches actual content through authorized API reads.
- Deliver task/comment invalidations to current authorized readers, including workspace owners/admins. Notifications have narrower recipient rules. Recheck authorization before delayed/retried dispatch; never include task descriptions or comment bodies in event payloads.
- Commit applicable notification rows with the task/comment mutation. Retry delivery independently with durable records where needed. Deduplicate delivery so reconnects and retries do not duplicate notifications.
- Proposed recipient rules: notify a new assignee; notify authorized task participants of new comments; notify creator/assignee of status changes. Participants are creator, assignee, and previous commenters. Exclude the actor and deduplicate recipients. These rules remain assumptions from the roadmap.
- Persist notification list, unread count, read state, and read/read-all actions independently of ephemeral live events. A recipient cannot read another user's notifications or content whose access has ended.
- Reconnect, token refresh, and return to a stale tab reload current saved state and unread counts. Clear affected private caches after revocation, workspace departure, admin demotion, token expiry, and sign-out. Subsequent unauthorized API reads/writes fail even while a connection remains open.
- Show transport state and allow manual refresh during failure. Periodic refresh must not replace the agreed primary live mechanism. Measure delivered latency rather than inventing a fixed guarantee.

### Trash, restoration, and purge

- Record trash time and display its expiry. A creator with current access or management may trash a task. Only management may restore it, in an active project and strictly before the 30-day cutoff.
- Restore comments and the previous status; an assignee who no longer belongs to the project becomes unassigned. Reject restoration at or after expiry even when physical deletion has not occurred.
- Use bounded, retry-safe scheduled deletion of expired tasks, associated comments, and sensitive notification references. Prevent restore/purge races. Supabase Cron is a proposed scheduler whose availability/configuration must be verified.
- Inaccessible, trashed, and purged links resolve to a neutral unavailable state. Cleanup must not delete active or archived work to compensate for exhausted free capacity.

### Infrastructure proposals and release gates

- Proposed development defaults are one repository with separate frontend/backend areas, Vite and React Router. Compatible stable versions, JavaScript Prisma Client generation, shared API/error/revision/event contracts, and visual direction remain setup work.
- Proposed hosting is Cloudflare Pages for static assets and investigation of Cloudflare Workers with Node compatibility for Express. Validate the actual Express/Prisma/Supabase pooler combination and free CPU/request limits; preserve a conventional Node local entry point. A conventional Node host is an alternative only after a suitable free route is verified.
- Render Free remains an unsettled preview candidate. Do not use artificial traffic to evade host limitations or implicitly substitute paid hosting.
- Proposed email is Resend on the already-owned sender domain: SMTP for Supabase account mail and HTTPS API for workspace invitations. The actual domain, DNS access, verification, shared account/invitation allowance, and restrictions require validation.
- Provider limits cited by the roadmap are planning evidence, not current verified guarantees. Recheck them during implementation. Do not assume unrestricted default Supabase mail, automatic free backups, or unlimited database/live capacity.
- Establish repeatable off-site exports using existing storage and prove restoration. Record Auth data exported or omitted and demonstrate restored identity links, memberships, tasks, and comments.
- Public capacity controls and fair-use values need pilot measurements and an owner decision. Include clear exhaustion states, recoverable outages, rollback, and a registration-pause procedure. Support/contact and data-handling information include archive/trash and account/workspace closure procedures; no new automated closure feature is specified.

## Testing Decisions

### Proposed seams, awaiting user confirmation

- Use the Express HTTP API backed by isolated real PostgreSQL test data as the primary automated integration seam. Exercise the same identity validation, permissions, queries, transactions, and persistence visible to clients. Do not add test-only permission/data interfaces or make React internals the main test boundary.
- Add browser-level workflow checks for behavior only visible in the interface: verified invited-user onboarding, board/list agreement, task discussion, notifications, keyboard interaction, narrow screens, and recovery states.
- Use two independently authenticated browsers and the deployed services to verify live collaboration and revocation. Verify real email delivery, Realtime policy enforcement, free-host compatibility, retention scheduling, and restoration as separate hosted checks; local passes cannot prove them.
- This workspace contains only the roadmap at specification time. No existing application code, test runner, reusable test seam, test fixture, glossary, ADR, or similar test suite was found. Test tooling/version choices are not prescribed by this specification.

### What makes a good test

- Assert externally observable behavior and persisted outcomes: authorized responses, denied access without leakage, transaction integrity, saved state, durable notifications, and exact recovery boundaries. Do not assert internal function names, component structure, implementation query counts, or transport ordering that the product does not promise.
- Use fixtures with two independent workspaces, owner/admin/manager/member roles, an outsider, and one user belonging to both workspaces. Include a removed member, departed assignee, expired invitation, archived project, and tasks on both sides of the trash cutoff.
- Exercise repeated and concurrent requests where correctness depends on them: invitation acceptance, revisions, delivery retries, and restore/purge races. Browser checks complement the API contract rather than duplicate every validation case.
- Record actual commands, versions, hosted configuration, outcomes, measured latency/usage, and failures when implementation occurs. No tests were run and no gates were passed by writing this specification.

### Acceptance checks

| Area | Required observable checks |
|---|---|
| Stack and identity | React reaches authenticated Express, which queries Supabase through Prisma in JavaScript; forged/expired identity is rejected; candidate host runs the same versions within verified free limits. |
| Accounts and mail | An address outside the Supabase dashboard team receives required account and invitation mail; verification, sign-in/out, and password reset work; delivery failures are visible. |
| Invitations | Verified invited address joins once; wrong/unverified address, expired/revoked/reused token, repeated/concurrent acceptance, existing member, and resend failure never grant unintended or duplicate membership. |
| Workspace permissions | Role controls and owner protections match the contract; cross-workspace membership/role requests fail; switching workspaces does not reuse private cached content. |
| Project permissions | Members see joined projects only; owners/admins see all own-workspace projects; creators become managers; managers cannot administer workspaces; direct unauthorized IDs fail. |
| Membership removal | Removal revokes related access and unassigns tasks atomically; subsequent reads/writes fail; departed management can be recovered by workspace oversight. |
| Tasks and views | Both views represent the same saved records; fixed statuses and single-assignee validation hold; unauthorized assignment fails; filters and progress exclude trashed work; empty projects show No tasks. |
| Comments and conflicts | Comments obey author/management rules; stale edits conflict; failed saves and board moves return to saved state; notification/live delivery failure does not undo a committed mutation. |
| Archive and trash | Archives deny all ordinary task/comment writes regardless of role; members cannot trash others' tasks; management restores only in active projects before cutoff with comments/status intact. |
| Expiry and cleanup | Restore succeeds before cutoff and fails exactly at/after it; departed assignees become unassigned; repeated/concurrent cleanup removes expired associated records without deleting unrelated work. |
| Notifications | Proposed recipient rules, self-exclusion, deduplication, offline persistence, unread count, and read/read-all work; forbidden/removed content is not leaked through notifications. |
| Live delivery | Authorized connected readers see saved changes without refresh; private subscriptions and authoritative publication are restricted; retries/reconnect/token refresh converge on saved state; revoked users receive no future private content. |
| Accessibility and failure | Keyboard users can change status without dragging; narrow-screen workflows are usable; loading/empty/error/conflict/offline/archived/forbidden states and neutral unavailable links behave as specified. |
| Pilot and recovery | At least two independent teams complete the core flow; no known isolation defect remains; restoration is demonstrated with Auth coverage recorded; measured usage fits free allowances with headroom. |
| Public launch | A new outside user registers, creates a workspace, invites a teammate, and collaborates; confirmed fair-use controls and abuse checks pass; final hosted email/revocation/retention/restore checks pass; exhaustion causes no lost work or unexpected spending. |

## Out of Scope

- AI assistance and social sign-in in the initial launch. Later roadmap phases are provisional, require their own decisions, and are not implementation work under this specification.
- Billing, subscriptions, paid plans, payments, or implicitly paid infrastructure upgrades.
- Activity email notifications. Account and workspace-invitation email remain required.
- Custom task statuses, multiple assignees, subtasks, dependencies, and attachments.
- Roadmap scope assumptions retained as exclusions: threaded comments, mentions, a project discussion feed, time tracking, source-control integration, presence indicators, native mobile applications, and comment edit history.
- Additional required views, integrations, settings, or automated account/workspace closure workflows that were not agreed. A personal task list is not added as an MVP deliverable.
- Replacing the confirmed stack to bypass an unresolved deployment gate, selecting social providers or AI capabilities, or committing to numeric public limits without the required decisions.
- Application implementation, dependency installation, migrations, account/DNS configuration, deployment, commits, and ticket decomposition during this specification task.

## Further Notes

### Source and evidence

The source is the approved [Developer Project Management Platform roadmap](developer-project-management-roadmap.md), dated 2026-10-13. Its Q1–Q25 decisions, language clarification, exclusions, proposed defaults, and evidence gates govern this specification. No product feature has been added. The workspace inspection found only that planning document and no configured Git repository or project issue tracker.

Provider documentation and quota statements have been carried forward as proposals/gates from the roadmap, without fresh external verification. They must be checked at their implementation gate. No application, live deployment, email delivery, test outcome, or provider capacity has been verified by this conversion.

### Implementation order and exit gates

| Roadmap phase | Implementable outcome | Exit condition before dependent release work |
|---|---|---|
| 1: Stack and free operating path | Thin authenticated React/Express/Prisma/Supabase path; private channel proof; candidate runtime and sender investigation | Compatible JavaScript versions, authenticated query, isolated private receive/server publish, and free-runtime evidence; unresolved host/adapter blocks deployment-dependent work. |
| 2: Accounts and workspace onboarding | Account flows, roster/roles, ownership safeguards, invitations and real mail | Outside-team address receives mail and joins once; invitation/role boundary checks pass; sender verification passes before external invitations. |
| 3: Private projects | Project creation, selected membership, oversight, archive/unarchive, manager recovery | Permission matrix passes and revocation denies subsequent API access; settle manager-removal edge cases before dependent task behavior. |
| 4: Task execution and recovery | Core fields/comments/revisions, board/list/filters/progress, trash/restore/purge | Shared saved-state behavior, archive restrictions, assignment integrity, exact expiry, and purge concurrency pass; retention scheduling is verified. |
| 5: Live collaboration | Recipient rules, notifications, private invalidations, retries and reconnect/revocation recovery | Two-browser privacy/recovery and mutation/delivery fault checks pass; measure transport latency, volume, and connections. |
| 6: Small team pilot | Selected-team use, consequential fixes, exports/restore, usage and operating evidence | Two independent teams complete collaboration; no known isolation defect; restoration demonstrated; free capacity has headroom. |
| 7: Free public launch | Public admission, confirmed limits, support/data procedures, exhaustion/rollback handling | Owner confirms fair-use values; final hosted acceptance passes; sustainable free operation and recoverable exhaustion are demonstrated. |

Local feature work may continue when a hosting gate fails, but pilot/public deployment remains provisional. Never mark deployment-dependent phases ready on local test evidence alone.

### Decisions still open

- Repository setup, final product name, actual sender domain/DNS access, and visual direction.
- The roadmap's explicit assumptions, including ownership defaults, comment rules, priority/date/progress defaults, notification recipients, invitation expiry, and proposed infrastructure. Keep their assumption status visible; material changes need user confirmation.
- Compatible dependency versions, Prisma JavaScript generation, runtime/pooler compatibility, provider quotas/restrictions, live revocation behavior, retention scheduler setup, Auth restoration coverage, and numeric fair-use values.
- Proposed testing seam confirmation required by to-spec. No existing seam is available to reuse.
- Project issue-tracker destination and triage configuration. Run `/setup-matt-pocock-skills` to supply these. Once the testing seams are confirmed and tracker setup is available, publish this specification with `ready-for-agent`, retaining every assumption and gate in the issue body. No extra triage is required and no publication has occurred yet.

This specification authorizes no implementation or later feature expansion. Further action must stay within the user-confirmed scope and preserve the unresolved gates.
