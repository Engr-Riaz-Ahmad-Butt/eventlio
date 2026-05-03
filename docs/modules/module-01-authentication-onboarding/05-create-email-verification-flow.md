# Task 05 - Create Email Verification Flow

## Goal
Verify user email addresses before granting full account access.

## Scope
- Trigger verification email after signup
- Build verification status messaging in the UI
- Handle verified, expired, and invalid verification states
- Prevent unverified users from using restricted flows where required

## Deliverables
- Email verification trigger flow
- Verification callback or confirmation screen
- Email verification status handling

## Acceptance Criteria
- New users receive a verification step after registration
- Verified users are marked correctly in the database or auth provider state
- Invalid or expired verification attempts show clear feedback
- Restricted flows can enforce verified-email checks
