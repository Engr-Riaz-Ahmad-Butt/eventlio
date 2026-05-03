# Task 09 - Setup Protected Routes

## Goal
Protect authenticated and role-restricted sections of the application.

## Scope
- Define public routes
- Define authenticated-only routes
- Define vendor-only and client-only routes where needed
- Add middleware or guards in frontend and backend
- Redirect unauthorized users safely

## Deliverables
- Protected route configuration
- Role-based guard logic
- Unauthorized and redirect behavior rules

## Acceptance Criteria
- Public pages remain accessible without login
- Protected pages require authentication
- Role-restricted pages reject the wrong user type
- Unauthorized access attempts redirect or fail gracefully
