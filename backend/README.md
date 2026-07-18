# Crime Analytics Platform Backend

This is the backend service for the AI-Driven Crime Analytics Platform.

## Architecture

The backend is built using Node.js and Express.js and connects to a PostgreSQL database. It follows a clean architecture:

- **Controllers:** Handles HTTP requests and responses.
- **Services:** Contains core business logic.
- **Repositories:** Handles direct interactions with the database (SQL queries).
- **Validations:** Request payload validation rules.
- **Routes:** API endpoint definitions.
- **Utils/Middlewares:** Cross-cutting concerns like error handling, logging, and response formatting.

## API Endpoints

All endpoints are prefixed with `/api/v1/`.

### Dashboard
- `GET /api/v1/dashboard/metrics` - Fetch all key dashboard metrics (total crimes, monthly trends, recent cases, etc.)

### Entities (CRUD Scaffolds)
- **Cases:** `/api/v1/cases`
- **Victims:** `/api/v1/victims`
- **Accused:** `/api/v1/accused`
- **Districts:** `/api/v1/districts`
- **Units:** `/api/v1/units`
- **Crime Categories:** `/api/v1/crime-categories`
- **Acts:** `/api/v1/acts`
- **Sections:** `/api/v1/sections`
- **Courts:** `/api/v1/courts`
- **Employees:** `/api/v1/employees`

## Database Schema & Seed Data

The database schema is defined in `database/init.sql` at the root of the project.
Seed data is defined in `database/seed.sql`, representing a realistic dataset for the Karnataka Police context (without actual official data).

## Setup & Running Locally

The application is containerized using Docker and managed with Docker Compose.

1. Ensure Docker is running.
2. From the root of the project, run:
   ```bash
   docker compose up --build -d
   ```
3. The backend will be available at `http://localhost:5000/`.
4. You can check the health endpoint at `http://localhost:5000/health`.

### Environment Variables

Required environment variables in `.env`:
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `POSTGRES_HOST`
- `PORT`
