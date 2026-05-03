# Task 02 - Implement JWT / Session Authentication

## Goal
Implement secure authentication for the application using the selected auth provider and session strategy.

## Scope
- Finalize auth strategy using Clerk-based session flow or project-approved equivalent
- Configure backend request authentication
- Secure API access with authenticated sessions
- Ensure frontend can access current user state
- Handle login, logout, and session refresh behavior

## Deliverables
- Auth middleware for frontend protected routes
- Backend auth guard or middleware
- Current-user/session endpoint or utility
- Session handling documentation

## Acceptance Criteria
- Unauthenticated users cannot access protected areas
- Authenticated users can remain signed in across refreshes
- Backend routes can identify the active user securely
- Login and logout behavior works without broken session state
