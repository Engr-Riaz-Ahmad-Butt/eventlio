# Task 01 - Create Authentication Database Schema

## Goal
Design the database structure required to support authentication, user roles, onboarding status, and profile setup for both vendors and clients.

## Scope
- Define the base `users` table
- Add role support for `vendor` and `client`
- Add fields for verification status
- Add onboarding progress tracking
- Add timestamps and audit fields
- Prepare relations for future vendor and client profile tables

## Deliverables
- Prisma schema updates for authentication-related entities
- Clear role and status enums
- Migration file for the initial auth schema
- Documentation for table relationships

## Acceptance Criteria
- A user can be stored with a unique identity and email
- The system can identify whether a user is a vendor or client
- Email and OTP verification states can be tracked
- Onboarding completion state is stored in the database
- Schema supports extension for profile modules without redesign
