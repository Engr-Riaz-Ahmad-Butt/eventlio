# Task 04 - Add Vendor / Client Role Selection

## Goal
Allow each new user to choose whether they are joining as a vendor or a client.

## Scope
- Add role selection to the registration flow
- Store selected role in the database
- Route users into the correct onboarding path
- Prevent invalid or missing role assignments

## Deliverables
- Role selection UI step
- Backend persistence for selected role
- Role-based redirect logic after signup

## Acceptance Criteria
- A user must choose `vendor` or `client` during registration
- The selected role is saved correctly
- Vendors and clients are sent to their own next-step flows
- Protected areas can use role data for access control
