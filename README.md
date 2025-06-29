# Appointment App - Node.js Backend

## How to Run (Local Development)
1. Start the project in dev mode:
  a. npm i           // install all packeges.
  b. npm run dev     // run in local server

2. I've included the .env file with all sensitive credentials.
   ⚠️ NOTE: There are not improtant for me right now, Do not misuse these credentials.
   The project will not run without them.

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

Thank you!
