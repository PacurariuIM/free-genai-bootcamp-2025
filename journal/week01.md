Lang Portal

# Instructions [link](../instructions)

I wrote separate instructions files for backend, frontend and database.

Also created a project_setup file and a file_structure file.

# Lang Portal TS Implementation Steps

## Phase 1: Initial Setup
1. Create project structure
2. Initialize Node.js project
3. Install core dependencies
4. Install dev dependencies
5. Configure TypeScript
6. Create directory structure

## Phase 2: Database Models
- Word
- Group
- WordGroup (junction)
- StudySession
- StudyActivity
- WordReview

## Phase 3: API Routes
1. Dashboard (`/api/dashboard/`)
2. Words (`/api/words/`)
3. Groups (`/api/groups/`)
4. Study Activities (`/api/study-activities/`)
5. Study Sessions (`/api/study-sessions/`)
6. Settings

## Phase 4: Data Seeding
- Basic vocabulary
- Word groups
- Study activities

## Phase 5: Testing & Documentation
- API tests
- Documentation
- Example requests/responses


# Phase 1: Initial Setup

## 1. Create project structure
```bash
mkdir lang_portal_ts
cd lang_portal_ts
mkdir backend
cd backend
```

## 2. Initialize Node.js project
***Note:*** By default, PowerShell restricts running scripts for security reasons
 This command should be run before initializing the project:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
```bash
npm init -y
```

## 3. Install core dependencies
```bash
npm install express sequelize sqlite3 zod
```

## 4. Install dev dependencies
```bash
npm install -D typescript @types/node @types/express ts-node-dev @types/sequelize
```

## 5. Configure TypeScript
```bash
npx tsc --init
```

## 6. Create directory structure
```bash
mkdir -p src/{config,models,routes,seeders,migrations}
```

