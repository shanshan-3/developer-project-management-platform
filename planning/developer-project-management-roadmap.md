# Developer Project Management Platform: Plan and Roadmap

Planning date: 2026-10-13. Product name is a working description.

Updated after the hosting discussion: Render Free is the development/demo backend option; Vercel is the proposed frontend alternative. Pilot/public hosting remains unresolved.

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

Evidence boundary: this began as a greenfield project. On resumption, the workspace contains a Git repository, a React/Vite starter in `frontend/`, an Express starter in `backend/`, and planning documents. Frontend ESLint is configured. Prisma, Supabase integration, migrations, and tests are not present in the inspected starter. The frontend currently requests port 3000 and expects JSON, while Express defaults to port 5000 and returns text; the initial API contract needs alignment. Provider documentation was rechecked for the hosting update. No runtime validation, implementation, dependency installation, migration, account configuration, or deployment was performed by this roadmap update.

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
| Render Free for development/demo backend hosting | Hosting follow-up: accepted demo option with “okay,” then requested roadmap update | Keep the normal Node/Express startup; do not treat this as pilot/public-host approval. |

### Proposed defaults and their basis

The following are **Assumptions**, not user-confirmed choices. No implementation decisions were explicitly delegated.

- Preserve the verified existing `frontend/` and `backend/` layout and backend `server.js` startup; the earlier `client/` and `server/` names were proposals. Author application source/configuration in JavaScript/JSX, with Prisma schema and SQL migrations as needed. Verify the chosen stable Prisma release generates a client usable by the JavaScript backend.
- Vite and frontend ESLint are now verified starter configuration. React Router remains a proposed navigation default. Styling and visual identity remain to be established during implementation. [Vite](https://vite.dev/guide/), [React Router](https://reactrouter.com/tutorials/quickstart).
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

**Proposed frontend hosting — Assumption:** Vercel instead of the earlier Cloudflare Pages proposal, following the user's frontend-hosting question. Vercel supports Vite; the candidate deployment settings are root `frontend`, framework Vite, build `npm run build`, and output `dist`. Vercel Hobby is restricted to personal, non-commercial use. A free public service is not automatically eligible; resolve intended-use eligibility and free quotas before adopting it for the pilot/public launch. Cloudflare Pages remains an alternative if eligibility fails. [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Vercel Hobby](https://vercel.com/docs/plans/hobby), [Pages limits](https://developers.cloudflare.com/pages/platform/limits/).

**Development/demo backend — User-confirmed:** Render Free Web Service with Node runtime, root `backend`, build `npm ci`, and start `npm start`. Keep PostgreSQL in Supabase. Add Prisma generation to the build only when Prisma is configured; database migration execution must follow a deliberate release step. Verify the host-assigned port, deployed frontend origin in CORS, public API URL, and Supabase Auth redirect allowlist. Frontend environment variables may contain only public configuration; database/service credentials stay server-side.

Render Free sleeps after 15 minutes without traffic and takes about one minute to wake. It has ephemeral local storage and shared free-instance hours; excess bandwidth/build usage may cause charges when a payment method is present, or suspension/build interruption without one. Keep saved application data and retry state in PostgreSQL; test wake/restart recovery and zero-cost settings. Render advises against free instances for production, so this choice does not clear pilot/public-host gates. Do not use artificial traffic to evade service limits. [Render Free limitations](https://render.com/docs/free), [Express deployment](https://render.com/docs/deploy-node-express-app).

**Pilot/public backend — Still unclear:** Select a suitable free operating path before real team admission. Cloudflare Workers with Node compatibility remains a candidate; this application's Express/Prisma/Supabase combination and free CPU/request capacity are untested. Investigate it if the demo host cannot meet the pilot/public requirements; neither a provider change nor paid upgrade is implicitly approved. [Express on Workers](https://developers.cloudflare.com/workers/tutorials/deploy-an-express-app/), [Workers limits](https://developers.cloudflare.com/workers/platform/limits/).

**Proposed email:** Resend free transactional service with the owned domain, SMTP for Supabase account mail, and the HTTPS API from Express for workspace invitations. Resend requires a verified domain and currently lists a 100-email daily free limit. Recheck monthly limits and account restrictions; account and invitation mail share the available allowance. Supabase's default sender is restricted to dashboard-team addresses. [Resend prerequisites](https://resend.com/docs/send-with-nodejs), [Resend pricing](https://resend.com/pricing), [Supabase SMTP](https://supabase.com/docs/guides/auth/auth-smtp).

Render Free blocks outbound SMTP ports. Retain the planned HTTPS API for Express invitation mail; Supabase Auth sends account mail through its separately configured SMTP provider. [Render network restrictions](https://render.com/docs/free).

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

Check a task after completing and checking its work. Finish a phase only when its checks pass and the conditions below it are met. Checkbox marks record progress; they do not replace those checks.

### Phase 1: Connect the app and check free hosting

**Goal:** Get a signed-in user from React through Express to the database. Test a hosted demo and record what still needs checking before real teams or the public can use it.

**Before you start:** Get approval to implement and access to development accounts and test data. The `frontend/` and `backend/` starters already exist.

**Tasks:**

- [x] Connect the React frontend in `frontend/` to the Express backend in `backend/`, using JavaScript/JSX. Point frontend requests to the backend's address and port, return JSON, show request errors, and document the startup commands.
- [ ] Check that the package versions work together. Set up Prisma, generate and import its database client in JavaScript, and run a PostgreSQL query.
- [ ] Test Supabase sign-in. Have Express check the sign-in token, which proves the user's session, before responding to a protected API request.
- [ ] Check whether this project can use Vercel Hobby's free frontend hosting. If it can, test the Vite build and deployment settings. When routes are added, check that opening or refreshing a page directly works.
- [ ] Deploy a demo backend on Render Free and test Supabase and Prisma queries. Check the port Render assigns, the API address, CORS settings that allow the frontend to call it, and allowed sign-in redirect addresses. Test recovery after sleep or restart and check settings that keep costs at zero. Keep the normal Node startup command.
- [ ] Record whether the demo host meets the needs of real teams and a public launch. If another free runtime is needed, test it before inviting teams. For Cloudflare, include any changes needed to run the app there or manage database connections.
- [ ] Test each user's private live-update channel. The server must be able to send updates; another user must not be able to join that channel, and the browser must not be able to send updates that pretend to be saved server changes.
- [ ] Confirm access to the owned email domain and its DNS settings. Check free email delivery through SMTP and an API, and record the providers' current usage limits.

**How to check:** A signed-in React user can call Express, which queries Supabase through Prisma. Fake identity tokens are rejected. The same package versions work on the demo host. The hosted frontend/API settings and recovery after sleep or restart work. Private channels stay private. Record Vercel eligibility and any hosting problems still blocking real-team or public use.

**Before moving on:** Resolve failed hosting eligibility, compatibility, or free-limit checks before deployment work that depends on them. A working Render demo does not prove it is suitable for real teams or authorize inviting them. Keep the chosen stack and zero-cost requirement unless changes are approved. Local feature work can continue while hosting questions remain open.

### Phase 2: Build accounts and workspaces

**Goal:** Users can create accounts and join the correct workspace.

**Before you start:** Phase 1 must establish how sign-in and database requests work. The email sender must be authorized.

**Tasks:**

- [ ] Build signup, email verification, sign-in/out, password reset, and basic display-name settings.
- [ ] Build workspace creation and switching, the member list, roles, and ownership transfer. Prevent a workspace from losing its final owner.
- [ ] Build invitations that can be accepted, expire, be resent, or be cancelled. Handle people who are already members.
- [ ] Set up custom SMTP for Supabase account emails and API delivery for workspace invitations. Show failed delivery without creating duplicate memberships.
- [ ] Allow only selected pilot users. Check on the server that the user's verified email matches the invited address and that workspace access is allowed.

**How to check:** Someone outside the Supabase dashboard team receives account and invitation emails and joins once. Wrong addresses, expired or cancelled invitations, and repeated acceptance are handled correctly. Users cannot change another workspace's members or roles.

**Before moving on:** Verify the real email sender and successful delivery before sending external pilot invitations.

### Phase 3: Build private projects

**Goal:** Teams can create projects and choose who can access each one. Other work stays private.

**Before you start:** Phase 2 workspace membership and ownership rules must work.

**Tasks:**

- [ ] Let workspace members create projects, become the project's manager, change settings, and add existing workspace members.
- [ ] Show only project lists and details that the user can access. Explain in membership settings that workspace owners/admins can oversee all workspace projects.
- [ ] Build archive/unarchive actions and the ability to replace a project manager.
- [ ] Plan how removing a member also removes their task assignments. Use the Phase 4 task data model and keep these database changes together so partial changes cannot be saved.
- [ ] Test API permissions for owners/admins, managers, regular members, and outsiders. Check requests that use IDs from another workspace.

**How to check:** Regular members see only projects they joined. Owners/admins see all projects in their workspace. Project managers cannot manage workspace-level settings. Removing access blocks later API reads and changes.

**Before moving on:** Resolve problems with removing or replacing managers before building task behavior that depends on those rules.

### Phase 4: Build tasks and recovery

**Goal:** Teams can plan tasks, track progress, discuss work, and recover accidentally removed tasks.

**Before you start:** Phase 3 permissions must work. Agree how task and comment data will be checked before saving.

**Tasks:**

- [ ] Build the core task fields, four statuses, one optional assignee, and comments. Detect edits based on an older version of a task.
- [ ] Build board/list views, task details, and filters. Make status changes usable with a keyboard.
- [ ] Calculate progress using tasks outside the trash. Show a clear message when there are no tasks.
- [ ] Make archived projects read-only for every task and comment change.
- [ ] Build permission checks for moving tasks to trash and restoring them. Set expiry dates and the 30-day cutoff. Schedule permanent removal of expired tasks, their comments, and references that could expose their contents.
- [ ] Test assignees who leave the project, failed saves, and the exact expiry cutoff. Check what happens when restoration and permanent cleanup run at the same time.

**How to check:** Board and list views show the same saved tasks. Assignment to someone outside the project fails. Members cannot trash other people's tasks. Management can restore before expiry, but not at or after it. Cleanup removes associated records, and archived projects reject changes.

**Before moving on:** Verify that scheduled cleanup works on the selected free setup.

### Phase 5: Add live updates and notifications

**Goal:** Connected teammates see saved changes as they happen. Notifications remain available when someone is offline.

**Before you start:** Phase 1 private-channel checks must pass. Phase 4 changes must save reliably before updates are sent.

**Tasks:**

- [ ] Decide who receives each notification using the agreed rules. Save notifications, show their list and unread count, and support marking one or all as read.
- [ ] Send live updates after database changes are saved. Make retries safe and check that recipients still have access when sending.
- [ ] Fetch current board/list data, task details, comments, progress, and unread counts after an update. Each API request must check access.
- [ ] Recover after reconnection or renewal of a sign-in token. Handle duplicate updates, clear private data on sign-out, and remove locally cached data when access is revoked.
- [ ] Test with two browsers, offline recipients, failed live connections, removed members, admins whose role changes, and attempts to join unauthorized channels.
- [ ] Measure how many updates and connections the app uses and compare them with current free-service limits.

**How to check:** Authorized connected browsers see saved changes promptly without refreshing. Record the actual delay. After reconnecting, the screen matches saved data. Offline notifications remain available without duplicates. Users whose access is removed receive no new private content.

**Before moving on:** Check privacy and failures during saving or update delivery before granting pilot access.

### Phase 6: Test with a few teams

**Goal:** A small group tests real collaboration and whether the service can operate for free.

**Before you start:** Phases 2–5 must pass their checks, real email delivery must work, and hosting must be suitable for pilot use. Confirm frontend free-plan eligibility and a backend suitable for real teams; a working Render Free demo alone is not enough.

**Tasks:**

- [ ] Invite selected teams and give them a short getting-started guide.
- [ ] Watch complete workflows and fix problems with invitations, permissions, live-update recovery, task restoration, keyboard use, and mobile layouts.
- [ ] Record database growth, emails sent, request and CPU usage, live-update traffic, connection counts, and actual costs.
- [ ] Make repeatable backups outside the hosting service using existing storage. Demonstrate restoring user identity links, memberships, tasks, and comments. Record which Supabase Auth data is included or missing.
- [ ] Document how to recover from outages, reaching provider limits, and a bad deployment, including how to return to the previous version.
- [ ] Use measured usage to propose per-user/workspace limits and thresholds for admitting more users.

**How to check:** At least two independent teams complete the core workflow. No known data-isolation problem remains. Backup restoration works. Usage stays within free limits with room to grow, and important pilot fixes pass their checks.

**Before moving on:** Keep public launch on hold if hosting, free-plan eligibility, email, backups, or capacity checks fail. Investigate the specific problem using evidence. Paid plans are outside the agreed product direction.

### Phase 7: Launch publicly for free

**Goal:** Anyone can register and use the platform free, within limits the service can support.

**Before you start:** Use the pilot results to confirm suitable public frontend/backend hosting, free-plan eligibility, and usage/admission limits. The Render Free demo choice alone does not meet these requirements.

**Tasks:**

- [ ] Open registration and workspace creation, requiring verified email addresses.
- [ ] Limit signup, invitations, resends, comments, and other changes to prevent abuse. Base usage limits on measurements and show clear messages when limits are reached.
- [ ] Provide support/contact details and explain data handling, archives, trash, and how accounts or workspaces are closed.
- [ ] Check that services use free configurations. Disable optional charges for exceeding limits where the provider supports it.
- [ ] After setting up the final release, recheck real email delivery, invitations, permissions, live updates after access removal, scheduled cleanup, and backup restoration.
- [ ] Monitor usage and document how to pause registration when free capacity runs out.

**How to check:** A new outside user can sign up, create a workspace, invite a teammate, and collaborate. Controlled abuse tests pass. There is no subscription or payment flow. The app can recover from provider-limit or hosting failures without losing work or causing unexpected charges.

**Before moving on:** The owner must choose actual usage limits based on pilot results. Verify that the public hosting setup works and has enough free capacity before claiming launch readiness.

### Phase 8: Add social sign-in later, provisional

**Goal:** Users can optionally sign in through another provider while keeping their existing account and workspace memberships.

**Before you start:** Existing accounts must be stable, and providers must be chosen. Google/GitHub were examples, not confirmed choices.

**Tasks:**

- [ ] Choose providers and set up the authorized addresses they return users to after sign-in.
- [ ] Define how verified email addresses match invitations and how new sign-in methods safely link to existing accounts.
- [ ] Test existing accounts, duplicate or conflicting identities, cancelled sign-in, removed provider access, and password sign-in as a fallback.

**How to check:** Users keep their identity and access across supported sign-in methods. Unverified or conflicting email claims cannot accept invitations.

**Before moving on:** Confirm the providers and account-linking rules before implementation.

### Phase 9: Add AI assistance later, provisional

**Goal:** Users can request summaries of projects they can access or suggested tasks based on a description.

**Before you start:** Permissions must be stable. Choose a provider with a usable free allowance and decide which data can be shared and how usage is limited.

**Tasks:**

- [ ] Choose the first AI feature and which authorized data it may send outside the platform.
- [ ] Send requests through Express. Keep provider keys on the server and apply user/workspace limits.
- [ ] Summarize only project data the requesting user can access. Say when information is missing instead of inventing progress.
- [ ] Return task suggestions in the agreed format so users can review and edit them. Save only tasks they explicitly accept.
- [ ] Test invalid AI output, project text that tries to override AI instructions, requests for unauthorized IDs, exhausted usage limits, and provider failures.

**How to check:** Summaries cannot use private projects the user cannot access. Suggestions do not create or assign tasks without approval. Ordinary collaboration keeps working when AI fails.

**Before moving on:** Keep AI deferred until a suitable free allowance and data-sharing decisions are available. Do not assume AI can run free indefinitely.

## 6. Dependencies, remaining uncertainties, and next step

### Ordering and independent work

Operating-path validation comes first. Accounts/workspaces precede projects; project access precedes tasks; task/comment contracts precede notification and live behavior. The pilot precedes public registration. Social sign-in and AI are independent later extensions and do not block the core product.

Frontend/API work can separate after agreeing on the membership model, task schemas, request/response shapes, errors, revision checks, and event payloads. These contracts and database migrations are shared work with one accountable editor. Once stable, email templates and isolated frontend views can proceed independently. This document does not create tickets or delegate implementation.

### Uncertainty map

**Settled:** All user-confirmed decisions in Section 3, including JavaScript, the final Supabase stack, live updates, free public direction, pilot first, 30-day retention, owned domain, and Render Free for development/demo backend hosting. The repository and `frontend/`/`backend/` starter layout are verified facts.

**Questions:** Final product name; actual sender domain/DNS access; visual direction; Vercel intended-use eligibility and adoption as the frontend host; whether to modify explicitly marked defaults. Resolve at implementation setup without repeating settled feature questions.

**Still unclear:** Suitable free pilot/public backend hosting, frontend free-plan eligibility/capacity, Render/Supabase wake/restart behavior, dependency compatibility and Prisma JavaScript client generation, email account restrictions, actual Realtime quotas/revocation behavior, backup/Auth restoration coverage, and numeric fair-use limits. Bounded gates in Phases 1, 5, 6, and 7 address these.

**Excluded:** Billing/paid plans, advanced launch task structures, activity emails, and first-release social sign-in/AI. Social sign-in and AI remain provisional later phases.

### First actionable step

When implementation is separately requested, align the existing frontend/backend API contract and perform Phase 1's thin JavaScript integration. Produce evidence that React, authenticated Express, Prisma, Supabase PostgreSQL, and private live events work together locally and on Render Free for development/demo use. Validate Vercel eligibility before using its free frontend plan, and establish a suitable free host before real-team pilot/public admission. Update this same document with actual versions, commands, outcomes, and failed gates before deployment-dependent work.

Planning ends here. Existing starter code is acknowledged; no Phase 1 integration, hosted validation, or external configuration was performed by this roadmap update.
