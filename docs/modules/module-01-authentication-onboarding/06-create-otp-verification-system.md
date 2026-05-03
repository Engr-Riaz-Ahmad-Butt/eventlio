# Task 06 - Create OTP Verification System

## Goal
Add one-time passcode verification to strengthen identity confirmation during onboarding or sensitive actions.

## Scope
- Generate OTP codes securely
- Deliver OTP through the approved channel
- Build OTP entry screen
- Validate submitted OTP codes
- Handle expiration, retry, and resend behavior

## Deliverables
- OTP generation and validation logic
- OTP verification UI
- Resend and expiry handling
- Audit-friendly verification state tracking

## Acceptance Criteria
- Users can receive and submit a valid OTP
- Expired or incorrect OTP entries are rejected safely
- OTP resend flow is controlled and rate-limited where needed
- Verification result is persisted correctly
