# High-Level Architecture: Monitor Service User Management

## Overview

The `monitor-service-user-mgmt` is a Node.js backend service for managing users in the Monitoring project. It authenticates users with Firebase, stores user data in MongoDB, and provides API endpoints for user operations (e.g., signup, get user). The service is written in TypeScript, tested with Jest, and deployable via Docker and Jenkins.

## Architecture Components

1. **Express Server (**`src/index.ts`**)**

   - Acts as the main entry point, starting the web server.
   - Connects to Firebase for authentication and MongoDB for data storage.
   - Routes requests to user or auth endpoints (e.g., `/users`, `/auth`).

2. **User Model (**`src/models/User.ts`**)**

   - Defines user data structure (e.g., `uid`, `email`, `createdAt`) for MongoDB.
   - Uses Mongoose to ensure data is saved consistently.

3. **Authentication (**`src/middlewares/authMiddleware.ts`**,** `src/auth/index.ts`**)**

   - Verifies Firebase tokens to secure user routes (e.g., `/users`).
   - Ensures only logged-in users access protected endpoints.

4. **API Routes (**`src/routes/authRoutes.ts`**,** `src/users/index.ts`**)**

   - Handles HTTP requests:
     - `/auth`: Public actions like signup (unprotected).
     - `/users`: Protected actions like get user data.
   - Links to controllers for logic.

5. **Controllers (**`src/controllers/authController.ts`**)**

   - Processes requests (e.g., create user, fetch user).
   - Interacts with Firebase and MongoDB to save or retrieve data.

6. **Types (**`src/types/index.ts`**)**

   - Defines TypeScript types (e.g., `UserProfile`) for code safety.

## Flow Example

- **Signup**: Client sends `POST /auth/signup` with a Firebase token → Express routes to `authRoutes` → Controller verifies token and saves user to MongoDB → Returns “User created.”
- **Get User**: Client sends `GET /users/uid123` with token → Middleware checks token → Controller fetches user from MongoDB → Returns user data.

## Diagram

```
Client
  ↓ (HTTP Requests)
Express (index.ts)
  ↓ (Auth)          ↓ (User Data)
Firebase           Routes (authRoutes, userRoutes)
                    ↓
                   Middleware (authMiddleware)
                    ↓
                   Controller (authController)
                    ↓
                   Mongoose (User.ts)
                    ↓
                   MongoDB
Jest: Tests code
Docker/Jenkins: Deploys
```
