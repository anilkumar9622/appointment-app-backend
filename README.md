# Appointment App - Node.js Backend

## How to Run (Local Development)
1. Start the project in dev mode:
   a. npm i           // install all packages
   b. npm run dev     // run on local server

2. I've included the .env file with all sensitive credentials.
   ⚠️ NOTE: These are not important for me now, but please do NOT misuse them.
   The project will not start without them.

3. Make sure your database is connected.
   Once connected, the server will start successfully.

4. I've provided a Postman collection.
   You can import it to test all API routes.

## Steps to Test the App:
5. First, sign up using the signup route.
   A verification email will be sent.

6. If the email link doesn’t work directly,
   copy the token and use it in the verify-email route from Postman.

7. After verifying the email, login to get your auth token.

8. Copy the login token and add it in the Postman headers:
   Key: Authorization  
   Value: Bearer <your-token>

## Postman Setup (IMPORTANT):
- Set common variables in the Postman environment:
  - `HOST`: http://localhost:8449 (or your running server URL)
  - `Authorization`: Paste your login token here

## Roles in the App:
- Admin
- Patient
- Doctor

---

## 🏗️ Application Architecture

### 1. Tech Stack
- Node.js + Express.js
- PostgreSQL (TypeORM)
- JWT Auth & Email Verification
- REST APIs

### 2. Core Entities
- **User**
  - Common entity for all roles (admin, doctor, patient)
  - Fields: `userId`, `name`, `email`, `password`, `role`, `isVerified`, etc.

- **Appointment**
  - Each appointment is booked between a doctor and a patient
  - Fields: `appointmentId`, `doctorId`, `patientId`, `date`, `time`, `status`, etc.

### 3. Relationships
- One `User` (with `DOCTOR` role) ⬌ can have many `Appointments` as doctor
- One `User` (with `PATIENT` role) ⬌ can have many `Appointments` as patient
- Appointment entity has:
  - `@ManyToOne(() => User)` for both `doctor` and `patient`

### 4. API Flow Summary
- **Sign up → Email Verification → Login**
- Authenticated users (via JWT) can:
  - Book appointments
  - View appointment list (based on role)
    - Doctor: sees only their appointments
    - Patient: sees only their own
    - Admin: can see all

---

Thank you!
