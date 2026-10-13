# Developer Project Management Platform: Plan and Roadmap

Planning date: 2026-10-13. Product name is a working description.

## 1. Status, goal, and success criteria

**Status: Partially blocked.** The product scope is settled and the first implementation phase is actionable. The free deployment path, real email delivery, and live-update capacity require validation before inviting pilot teams. Public launch remains provisional until the pilot demonstrates a workable zero-cost operating model.

Build a new application for small developer teams managing their own projects. Users organize projects inside workspaces, grant selected members access, collaborate on tasks, comment, track progress, and receive live updates and notifications. Start with a small team pilot, then open registration publicly. The service stays free for everyone, with no subscriptions or paid plans.

Success is observable when:

- A verified user creates a workspace, invites a teammate by email, and the teammate joins using the invited address.
- Regular members access only projects they have joined; workspace owners/admins access all projects in their own workspace.
- Project members create, edit, assign, discuss, and move tasks through the fixed workflow in board and list views.
- Connected authorized teammates see saved changes without manually refreshing. Reconnecting restores current state.
- In-app notifications persist for offline recipients and support read/unread state.
- Archived projects are read-only. Tasks can be restored from trash for 30 days, then tasks and associated comments are permanently removed.
- Two independent pilot teams complete the collaboration flow without exposing data across workspaces or unauthorized projects.
- Hosted email, permission revocation, recovery, and measured provider usage pass their checks before public release.

Evidence boundary: this is a greenfield project. No repository, application source, runtime, or existing tests were supplied. Proposed paths and technical choices below are not existing files. Documentation was checked; no implementation, dependency installation, migration, account configuration, or deployment was performed during planning.

## 2. Scope

### Included for launch

- JavaScript application code: React frontend and Node.js/Express backend.
- Prisma with Supabase PostgreSQL; Supabase Auth for email/password accounts, verification, and password reset.
- Workspaces with owner/admin/member roles and email-specific invitations.
- Projects accessible to selected workspace members, with workspace owner/admin oversight.
- Project creation by any workspace member; the creator becomes project manager and can add existing workspace members.
- Shared task management: title, description, status, one optional assignee, priority, optional due date, and comments.
- Fixed statuses: **To do, In progress, In review, Done**.
- Board and list views of the same task records, with filtering and project progress.
- Live task/comment changes and persisted in-app notifications.
- Read-only project archives; task trash, management restoration, and 30-day permanent removal.
- A small team pilot followed by free public registration, subject to launch gates.
- Free-service operating target and use of an already-owned sender domain.

### Excluded from launch

- AI assistance and social sign-in: explicitly deferred to later phases.
- Billing, subscriptions, paid plans, and payment integrations: excluded from the product direction.
- Activity email notifications; email is still required for invitations and account flows.
- Custom task statuses, multiple assignees, subtasks, dependencies, and attachments.

Proposed scope limits, marked **Assumption**: comments are flat plain text on tasks, without threads or mentions. No project discussion feed, time tracking, source-control integration, presence indicators, or native mobile app. These were not requested. Basic responsive web use is planned.

## 3. Decisions and rationale

### User-confirmed decisions

| Decision | Discovery reference | Implication |
|---|---|---|
| Product for real small developer teams working on their own projects | Q1–Q2 | Plan for ongoing use and operational recovery with a focused initial audience. |
| Workspaces containing selected-access projects | Q3–Q4 | Workspace membership alone does not grant project access. |
| Workspace owner/admin access to every project | Q5 | Administrators can recover abandoned work; clearly explain their access. |
| Any member creates a project and becomes its manager | Q6 | Developers can start work without waiting for an administrator. |
| Project members share task creation, editing, assignment, and status updates | Q7 | Collaboration is flexible; settings and membership remain under management control. |
| Four fixed statuses and one optional assignee | Q8–Q9 | Consistent reporting and clear responsibility. |
| Board and list views | Q10 | Support workflow overview and detailed scanning of the same records. |
| Invitations tied to a specific email address | Q11 | Verify the intended recipient; joining a workspace does not join its projects. |
| In-app activity notifications and core task fields | Q12–Q13 | Complete the basic collaboration flow without advanced task structures. |
| Read-only archives and recoverable task trash | Q14 | Preserve project history and recover mistakes. |
| Creator or management can trash a task | Q15 | Shared editing does not grant unrestricted removal of others' work. |
| New app; JavaScript, React, Node/Express, Prisma, Supabase PostgreSQL/Auth | Q16–Q17, Q19 and language clarification | Supabase replaces the earlier MySQL choice. |
| Email/password now; social sign-in later | Q18 | Account verification and password reset belong in launch scope. |
| Live updates, rather than periodic refresh as the primary mechanism | Q20 | Connected teammates receive changes as work happens. |
| Free for everyone, no paid plans, free hosting services only | Q21–Q22 | No billing features or implicit paid upgrades. Capacity must be measured. |
| Small team pilot, then free public launch | Q23 | Pilot evidence gates opening registration; public release remains the goal. |
| 30-day trash retention, followed by permanent removal of tasks/comments | Q24 | Recovery has a clear deadline and trash storage is bounded. |
| Owned sender domain available | Q25 | A provider can verify it; the actual domain and DNS access are not yet recorded. |

### Proposed defaults and their basis

The following are **Assumptions**, not user-confirmed choices. No implementation decisions were explicitly delegated.

- One repository with `client/` and `server/`. Author application source/configuration in JavaScript/JSX, with Prisma schema and SQL migrations as needed. Verify the chosen stable Prisma release generates a client usable by the JavaScript backend.
- Vite for frontend development/builds and React Router for navigation. Styling and visual identity remain to be established during implementation. [Vite](https://vite.dev/guide/), [React Router](https://reactrouter.com/tutorials/quickstart).
- A user may belong to multiple workspaces. A workspace has one owner, who appoints admins and transfers ownership. Prevent removal/departure of the final owner until ownership is transferred.
- Assignment requires explicit current project membership, including for owners/admins. A task creator's trash permission does not survive losing project access.
- Project management controls settings, membership, archive/unarchive, and restore. Project managers cannot promote workspace admins.
- Comment authors may edit their comments; authors and project management may remove them. Comment edit history is outside launch scope.
- Priority values are Low, Medium, and High; due dates are date-only. Progress is Done divided by all non-trashed tasks. Empty projects display “No tasks,” without implying completion.
- Notify the new assignee; notify current authorized task participants about new comments; notify the creator/assignee about status changes. Participants are creator, assignee, and previous commenters. Exclude the actor and deduplicate recipients.
- Invitations expire after seven days and can be revoked or resent. Resending invalidates the previous token. Seven days is a proposed operational default.

### Verified evidence and infrastructure proposals

Supabase provides PostgreSQL and Auth and documents Prisma connectivity. Express owns application permission checks. Prisma database access must not be assumed to inherit a browser user's RLS permissions. [Database](https://supabase.com/docs/guides/database/overview), [Auth](https://supabase.com/docs/guides/auth), [Prisma connectivity](https://supabase.com/docs/guides/database/prisma).

**Proposed live transport:** Supabase Realtime private Broadcast channels, one per authenticated user. Express publishes minimal invalidation signals to currently authorized recipients after commits; clients fetch actual contents through Express. Private channel authorization is evaluated at channel join, so membership revocation with existing connections needs explicit testing. [Realtime authorization](https://supabase.com/docs/guides/realtime/authorization), [Broadcast](https://supabase.com/docs/guides/realtime/broadcast).

**Proposed hosting:** Cloudflare Pages for static React assets; investigate Cloudflare Workers with Node compatibility for Express. Express support is documented, but this application's JavaScript/Prisma/Supabase combination is untested. Compatibility and free CPU/request limits are Phase 1 gates. A conventional Node host is an alternative only if a suitable free operating path is verified. [Pages limits](https://developers.cloudflare.com/pages/platform/limits/), [Express on Workers](https://developers.cloudflare.com/workers/tutorials/deploy-an-express-app/), [Workers limits](https://developers.cloudflare.com/workers/platform/limits/).

Render Free was researched as a preview candidate. Its inactivity sleep and documented production limitations make it an unsettled public-host choice. Do not use artificial traffic to evade service limits. [Render Free limitations](https://render.com/docs/free).

**Proposed email:** Resend free transactional service with the owned domain, SMTP for Supabase account mail, and the HTTPS API from Express for workspace invitations. Resend requires a verified domain and currently lists a 100-email daily free limit. Recheck monthly limits and account restrictions; account and invitation mail share the available allowance. Supabase's default sender is restricted to dashboard-team addresses. [Resend prerequisites](https://resend.com/docs/send-with-nodejs), [Resend pricing](https://resend.com/pricing), [Supabase SMTP](https://supabase.com/docs/guides/auth/auth-smtp).

Supabase Free currently lists a 500 MB database, inactivity pausing, and no automatic backups. Plan regular off-site exports and a tested restore using existing storage. Archived history still grows; trash expiry alone does not establish long-term capacity. [Free tier](https://supabase.com/pricing), [Backup guidance](https://supabase.com/docs/guides/platform/backups).

## 4. Implementation plan

### User flow

1. Register, verify email, sign in, and create a workspace as owner. Pilot account admission is controlled; public registration opens later.
2. Invite a teammate. The recipient follows the email link, signs in or registers with that address, and accepts once.
3. A workspace member creates a project as manager and selects existing workspace members for access.
4. Project members open the board/list, create a task, choose priority/date, and optionally assign one project member.
5. Members edit tasks, change status, and comment. Connected readers receive live changes; relevant recipients receive persisted notifications.
6. View completion counts/percentage and filter by status, assignee, priority, or due date. A personal task list can reuse authorized assignment queries without a new task model.
7. Management archives completed projects as read-only history and can unarchive to resume work.
8. Authorized removers trash tasks. Management can restore before the 30-day cutoff; expired tasks/comments become unavailable and scheduled cleanup removes their records.

### Permission contract

| Action | Workspace owner/admin | Project manager | Project member | Other workspace member |
|---|---|---|---|---|
| Read project contents | All projects in own workspace | Managed project | Joined project | Denied |
| Create project | Yes | Yes as workspace member | Yes as workspace member | Yes; becomes new project's manager |
| Invite/remove workspace members | Yes, with owner protections | No | No | No |
| Manage project members/settings | Yes | Managed project | No | No |
| Create/edit/assign tasks, change status, comment | Yes in active projects | Yes | Yes | Denied |
| Trash task | Any task in own workspace | Any task in managed project | Own-created task only | Denied |
| Restore task; archive/unarchive | Yes | Managed project | No | Denied |

Owner protections and unarchiving are proposed defaults. Admins cannot transfer ownership or appoint themselves owner. Archives deny ordinary task/comment writes regardless of role. System retention cleanup continues while projects are archived; restoring work requires unarchiving first.

### Data and API

Proposed records: profile linked to Supabase Auth ID; workspace; workspace membership; invitation; project; project membership with manager/member role; task; comment; notification; and a small durable delivery record where email/live retries require one.

- Enforce unique memberships and foreign keys. Validate that project members belong to the same workspace and assignees belong to their project.
- Derive identity from a validated Supabase token/session. Check current database membership and role, not browser-supplied role names or IDs.
- Scope every query and mutation. Unauthorized access must not reveal private titles, comments, progress, search results, or notification contents. Hiding controls is not authorization.
- Keep app-data reads/writes behind Express/Prisma. Disable the app Data API or deny direct browser access to app tables. Separately manage narrow Realtime receive policies. Never expose service/database credentials in React.
- Supabase owns Auth tables; Prisma migrations own app tables; reviewed SQL migrations own Realtime policies and retention jobs. Do not create competing migration histories.
- Commit task changes and applicable notification rows together. Publish live signals after commit and retry failures independently; a failed broadcast must not make a saved task appear unsaved.
- Paginate task/comment/notification lists and index membership, project, assignee, and unread queries.
- Use a task revision to reject stale edits with a conflict response. Failed board moves return to saved state with feedback.

### Live updates and notifications

Subscribe to a private user channel whose receive policy checks the authenticated user's identity. Deny browser publication of authoritative changes. Publish task/comment invalidation events to all current authorized readers, including workspace admins; notification recipients are the narrower set described in defaults. Recheck recipients when dispatching delayed/retried signals.

Events contain IDs/invalidation hints, not task descriptions or comment bodies. Clients refetch through authorized Express endpoints. Reconnect, token refresh, and returning to a stale tab reload current state and unread counts. Deduplicate event delivery; notification records are durable and do not depend on Realtime messages being retained.

Test membership removal, workspace departure, admin demotion, token expiry, and sign-out with connections still open. Clear affected private caches and deny subsequent API reads. Realtime transport failure shows connection state and allows manual refresh; periodic refresh does not replace the agreed primary live mechanism.

### Edge cases and recovery

- Invitations: wrong/unverified email, expired/revoked/reused tokens, existing members, duplicate acceptance, sender failure, and resend abuse. Store token hashes and make acceptance transactional and repeat-safe. Match verified normalized addresses without stripping provider-specific dots or aliases.
- Membership removal: remove associated project access and unassign affected tasks transactionally. Owner/admin oversight permits recovery when a project manager leaves; appoint a replacement where possible.
- Restore: preserve comments and previous status; departed assignees become unassigned. Refuse restoration at/after expiry even if physical cleanup has not run. Prevent restore/purge races.
- Purge: schedule bounded retry-safe deletion of expired tasks, comments, and sensitive notification references. Display expiry dates. Supabase Cron is proposed; verify its configuration on the selected service. [Cron documentation](https://supabase.com/docs/guides/database/extensions/pg_cron).
- Unavailable links: trashed, purged, or newly inaccessible work displays a neutral unavailable state without content leakage.
- Interface: empty/loading/error states; failed saves; conflicts; offline/reconnecting; archives and forbidden access. Status changes work by keyboard; drag-and-drop is optional convenience.
- Capacity: bounded inputs/queries and request limits. Explain temporary exhaustion; do not silently delete active/archived work or enroll users in paid services.

### Validation

Use PostgreSQL integration tests for the permission matrix, invitation transactions, assignee integrity, archive restrictions, and restore/purge boundaries. Include users from two workspaces and one user who belongs to both, checking workspace-switch cache isolation.

Browser checks cover invited-user onboarding, board/list consistency, comments, notifications, keyboard access, and narrow screens. Two separately authenticated browsers exercise live collaboration and revocation. Fault checks cover email failure, interrupted connections, stale edits, and repeated operations.

Local passes do not verify deployed email, Realtime policies, provider capacity, or restoration. Record evidence for those hosted boundaries separately as implementation progresses.

## 5. Phase-by-phase roadmap

Every checkbox is planned work. None are completed.

### Phase 1: Validate the JavaScript stack and free operating path

**Outcome:** A thin authenticated frontend/API/database path and evidence supporting hosting and live transport.

**Prerequisites:** Separate implementation authorization, a new repository location, and authorized development accounts/test data.

- [ ] Establish `client/` React/Vite and `server/` Express apps in JavaScript/JSX; document real commands after creating the repository.
- [ ] Select compatible stable dependency versions; generate/import Prisma Client in JavaScript and execute a PostgreSQL query.
- [ ] Validate Supabase sign-in, server-side token checking, and an authenticated Express endpoint.
- [ ] Test the candidate Cloudflare adapter, Supabase pooler, and Prisma queries within free runtime limits; preserve a normal Node local entry point.
- [ ] Test a private user channel: server publication succeeds, another user cannot subscribe, and client-origin authoritative publication is denied.
- [ ] Confirm the owned domain/DNS access and free SMTP/API delivery route; record current provider quotas.

**Acceptance:** React calls an authenticated Express endpoint that queries Supabase through Prisma. Forged identity is rejected. The same dependency versions work on the candidate host. Private channel isolation passes.

**Gate:** If compatibility or free limits fail, resolve the specific host/adapter before deployment-dependent work. Do not implicitly replace the selected stack or approve spending. Local feature work can continue; pilot hosting stays provisional.

### Phase 2: Accounts and workspace onboarding

**Outcome:** Real users create accounts and join the intended workspace.

**Prerequisites:** Phase 1 identity/data contract and authorized sender setup.

- [ ] Build signup, verification, sign-in/out, password reset, and minimal display-name settings.
- [ ] Build workspace creation/switching, roster, roles, owner transfer, and final-owner protections.
- [ ] Build invitations, acceptance, expiry, resend/revoke, and duplicate-member handling.
- [ ] Configure custom Auth SMTP and API-based workspace invitation delivery; show delivery failure without duplicate membership.
- [ ] Restrict pilot admission and enforce verified invited-address matching/server-side workspace checks.

**Acceptance:** An address outside the Supabase dashboard team receives account/invitation mail and joins once. Wrong-address, expired, revoked, and repeated acceptance behave correctly. Users cannot change another workspace's memberships/roles.

**Gate:** Real sender verification and delivery pass before external pilot invitations.

### Phase 3: Private projects and management access

**Outcome:** Teams create projects and grant access without revealing other work.

**Prerequisites:** Phase 2 workspace membership/ownership rules.

- [ ] Implement project creation, creator-as-manager, settings, and selection of existing workspace members.
- [ ] Filter project lists/details by authorization; explain owner/admin oversight in membership settings.
- [ ] Implement archive/unarchive and manager replacement.
- [ ] Define removal/unassignment transactions against the Phase 4 task schema.
- [ ] Verify owner/admin overrides, manager limits, member limits, outsiders, and cross-workspace IDs through API checks.

**Acceptance:** Members see joined projects only; owners/admins see all projects in their workspace. Managers cannot administer the workspace. Revocation blocks subsequent API reads/writes.

**Gate:** Resolve any discovered manager-removal edge case before dependent task behavior.

### Phase 4: Task execution, progress, and recovery

**Outcome:** A team plans, performs, discusses, and recovers its work.

**Prerequisites:** Phase 3 permissions and shared task/comment validation contracts.

- [ ] Build core task fields, four statuses, one optional assignee, comments, and stale-edit handling.
- [ ] Build board/list views, task details, filters, and accessible status actions.
- [ ] Calculate progress from non-trashed tasks with an explicit empty state.
- [ ] Enforce archive read-only behavior across every task/comment mutation.
- [ ] Build authorized trash/restore, expiry dates, the 30-day cutoff, and scheduled purge of tasks/comments/sensitive references.
- [ ] Check departed assignees, failed saves, exact expiry boundaries, and restore/purge concurrency.

**Acceptance:** Both views show the same saved work. Assignment outside the project fails. Members cannot trash others' tasks. Management restores before expiry, but not at/after expiry. Cleanup removes associated records. Archives deny writes.

**Gate:** Verify retention scheduling on the selected free configuration.

### Phase 5: Live collaboration and in-app notifications

**Outcome:** Connected teammates stay current; offline recipients retain notifications.

**Prerequisites:** Phase 1 private-channel proof and Phase 4 committed mutation behavior.

- [ ] Implement recipient rules, persistent notifications, unread count/list, and read/read-all actions.
- [ ] Implement post-commit events and retry-safe dispatch with current authorization checks.
- [ ] Refresh board/list/task details/comments/progress/unread counts through authorized refetches.
- [ ] Implement reconnect/token-refresh recovery, deduplication, sign-out cleanup, and revoked-access cache clearing.
- [ ] Test two browsers, offline recipients, transport failure, membership removal, admin demotion, and unauthorized subscriptions.
- [ ] Measure event volume and connections against current free allowances.

**Acceptance:** Authorized connected browsers see saved changes promptly without refresh; record measured latency rather than asserting an untested guarantee. Reconnection converges on saved state. Offline notifications persist without duplicates. Revoked users receive no future private content.

**Gate:** Transport privacy and mutation/delivery failure checks pass before pilot access.

### Phase 6: Small team pilot and operating evidence

**Outcome:** A few teams validate actual collaboration and the free operating model.

**Prerequisites:** Phases 2–5 acceptance, real email delivery, and a verified pilot host.

- [ ] Admit selected teams and provide short onboarding guidance.
- [ ] Observe complete workflows and fix invitation, permission, live recovery, restoration, keyboard, and mobile failures.
- [ ] Record database growth, email totals, request/CPU consumption, event traffic, connection counts, and actual cost.
- [ ] Establish repeatable off-site exports using existing storage and demonstrate restoration of identity links, memberships, tasks, and comments. Record exported/omitted Auth data explicitly.
- [ ] Document outage recovery, provider exhaustion, and deployment rollback.
- [ ] Derive proposed fair-use limits/admission thresholds from measured usage.

**Acceptance:** At least two independent teams complete the core flow; no known isolation defect remains. Restore is demonstrated. Measured usage fits free allowances with headroom, and consequential pilot fixes pass verification.

**Gate:** Public release remains provisional if hosting, email, backups, or capacity fails. Revisit the specific constraint with evidence; paid plans are not a product workaround.

### Phase 7: Free public launch

**Outcome:** Anyone can register and use the platform free within a sustainable operating envelope.

**Prerequisites:** Pilot evidence, suitable public hosting, and confirmed fair-use values/capacity thresholds.

- [ ] Open registration/workspace creation with verified-email requirements.
- [ ] Apply signup/invite/resend/comment/mutation limits and measured fair-use controls, with clear error states.
- [ ] Provide support/contact and data-handling information, including archive/trash and account/workspace closure procedures.
- [ ] Confirm free service configurations and disable optional paid overages where supported.
- [ ] Recheck deployed email, invitations, access control, live revocation, retention, and restoration after final release configuration.
- [ ] Monitor usage and establish a registration-pause procedure when free capacity is exhausted.

**Acceptance:** A new outside user signs up, creates a workspace, invites a teammate, and collaborates. Bounded abuse checks pass. No subscription/payment flow exists. Quota/host failure is recoverable without lost work or unexpected spending.

**Gate:** Actual fair-use values require an owner decision informed by pilot data. Public runtime compatibility and capacity remain evidence gates, not completed readiness claims.

### Phase 8: Social sign-in later, provisional

**Outcome:** Optional provider sign-in preserves existing identities and memberships.

**Prerequisites:** Stable accounts and provider selection; Google/GitHub were examples, not confirmed requirements.

- [ ] Select providers and configure authorized callbacks.
- [ ] Define verified-email invitation matching and safe account linking.
- [ ] Test existing accounts, conflicting/duplicate identities, cancellation, revocation, and password-login fallback.

**Acceptance:** Users retain identity/access across supported methods; unverified/conflicting email claims do not acquire invitations.

**Gate:** Confirm providers and account-linking behavior before implementing.

### Phase 9: AI assistance later, provisional

**Outcome:** Authorized users request project summaries or suggested tasks from a description.

**Prerequisites:** Stable permissions, a provider with a viable free allowance, and decisions about data sharing and usage limits.

- [ ] Select the first capability and authorized data that may leave the platform.
- [ ] Send requests through Express with server-only keys and user/workspace limits.
- [ ] Generate summaries from the caller's authorized context; identify insufficient information rather than inventing progress.
- [ ] Return suggestions in the agreed task format for review/editing; save only explicitly accepted tasks.
- [ ] Check malformed output, prompt injection in project text, unauthorized IDs, quota exhaustion, and provider failure.

**Acceptance:** Summaries cannot read unauthorized projects; suggestions do not silently create/assign work. Failure leaves ordinary collaboration intact.

**Gate:** AI remains deferred if a suitable free allowance or data-sharing decision is unavailable. Indefinite zero-cost AI operation is not assumed.

## 6. Dependencies, remaining uncertainties, and next step

### Ordering and independent work

Operating-path validation comes first. Accounts/workspaces precede projects; project access precedes tasks; task/comment contracts precede notification and live behavior. The pilot precedes public registration. Social sign-in and AI are independent later extensions and do not block the core product.

Frontend/API work can separate after agreeing on the membership model, task schemas, request/response shapes, errors, revision checks, and event payloads. These contracts and database migrations are shared work with one accountable editor. Once stable, email templates and isolated frontend views can proceed independently. This document does not create tickets or delegate implementation.

### Uncertainty map

**Settled:** All user-confirmed decisions in Section 3, including JavaScript, the final Supabase stack, live updates, free public direction, pilot first, 30-day retention, and owned domain.

**Questions:** Repository location/product name; actual sender domain/DNS access; visual direction; whether to modify explicitly marked defaults. Resolve at implementation setup without repeating settled feature questions.

**Still unclear:** Free public runtime compatibility/capacity, stable dependency versions and JavaScript client generation, email account restrictions, actual Realtime quotas/revocation behavior, backup/Auth restoration coverage, and numeric fair-use limits. Bounded gates in Phases 1, 5, 6, and 7 address these.

**Excluded:** Billing/paid plans, advanced launch task structures, activity emails, and first-release social sign-in/AI. Social sign-in and AI remain provisional later phases.

### First actionable step

When implementation is separately requested, establish the new repository and perform Phase 1's thin JavaScript integration. Produce evidence that React, authenticated Express, Prisma, Supabase PostgreSQL, and private live events work together locally and on a candidate free runtime. Update this same document with actual versions, commands, outcomes, and failed gates before deployment-dependent work.

Planning ends here. No Phase 1 implementation or external configuration has been performed.
