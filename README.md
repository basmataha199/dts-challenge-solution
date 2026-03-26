# Task Management System for HMCTS

A full-stack task management application for caseworkers to efficiently manage and track their tasks.

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, Prisma ORM
- **Frontend:** React, TypeScript, Vite
- **Database:** PostgreSQL
- **Validation:** Zod
- **Testing:** Jest
- **Package Manager:** Yarn (monorepo)

## Project Structure

```
packages/
├── backend/
│   ├── src/
│   │   ├── app.ts                 # Express app configuration
│   │   ├── server.ts              # Server entry point
│   │   ├── db/
│   │   │   └── client.ts          # Prisma client
│   │   ├── routes/
│   │   │   └── tasks.ts           # Task routes
│   │   ├── middleware/
│   │   │   └── validation.ts      # Zod validation schemas
│   │   └── types/
│   │       └── task.ts            # TypeScript types
│   ├── tests/
│   │   └── tasks.test.ts          # Jest unit tests
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.tsx                # Main app component
    │   ├── index.tsx              # Entry point
    │   ├── index.css              # Global styles
    │   ├── components/
    │   │   ├── TaskForm.tsx       # Create task form
    │   │   ├── TaskList.tsx       # Task list display
    │   │   └── TaskCard.tsx       # Individual task card
    │   ├── services/
    │   │   └── api.ts             # API client (Axios)
    │   ├── hooks/
    │   │   └── useTasks.tsx       # Custom hook + context
    │   └── types/
    │       └── task.ts            # TypeScript types
    ├── index.html
    ├── vite.config.ts
    └── package.json
```

## Prerequisites

- Node.js 18+
- Yarn (or npm)
- Docker & Docker Compose (for PostgreSQL)

## Setup Instructions

### 1. Install Dependencies

```bash
cd dts-developer-challenge
yarn install
```

### 2. Set Up Database

Start PostgreSQL using Docker:

```bash
docker-compose up -d
```

### 3. Configure Backend Environment

Copy the example env file:

```bash
cp packages/backend/.env.example packages/backend/.env
```

### 4. Initialize Database with Prisma

```bash
cd packages/backend
npx prisma migrate dev --name init
cd ../..
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
yarn dev:backend
```

**Terminal 2 - Frontend:**
```bash
yarn dev:frontend
```

The application will be available at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a specific task |
| PUT | `/api/tasks/:id` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example Requests

#### Create a Task
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review case file",
    "description": "Review case #12345",
    "status": "pending",
    "dueAt": "2024-12-31T12:00:00Z"
  }'
```

#### Get All Tasks
```bash
curl http://localhost:3001/api/tasks
```

#### Update Task Status
```bash
curl -X PUT http://localhost:3001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "in-progress"}'
```

#### Delete a Task
```bash
curl -X DELETE http://localhost:3001/api/tasks/1
```

## Testing

Run backend unit tests:

```bash
yarn test
```

Tests are located in `packages/backend/tests/` and cover:
- Task creation with validation
- Retrieving tasks
- Updating task status
- Deleting tasks
- Error handling (400, 404, 500 status codes)

## Features

### Backend
- ✅ CRUD operations for tasks
- ✅ Request validation with Zod
- ✅ Comprehensive error handling
- ✅ Proper HTTP status codes
- ✅ TypeScript for type safety
- ✅ Unit tests with Jest

### Frontend
- ✅ Create tasks with form validation
- ✅ View all tasks sorted by status and due date
- ✅ Update task status in-line
- ✅ Delete tasks with confirmation
- ✅ Real-time state management with Context API
- ✅ Error handling and loading states
- ✅ Responsive UI with inline styles

## Development

### Adding New Features

1. **Backend**: Add validation schema in `src/middleware/validation.ts`, add route in `src/routes/tasks.ts`, and update database schema in `prisma/schema.prisma`
2. **Frontend**: Create new components and update `useTasks` hook if needed

### Debugging

- Backend runs on `http://localhost:3001`
- Frontend runs on `http://localhost:3000`
- API proxy is configured in `frontend/vite.config.ts`
