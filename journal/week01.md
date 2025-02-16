Lang Portal

# Instructions [link](../instructions)

I wrote separate instructions files for backend, frontend and database.

Also created a project_setup file and a file_structure file.

# Lang Portal TS Implementation Steps

## Phase 1: Initial Setup
1. Create project structure
```bash
mkdir lang_portal_ts
cd lang_portal_ts
mkdir backend
cd backend
```

2. Initialize Node.js project
***Note:*** By default, PowerShell restricts running scripts for security reasons
 This command should be run before initializing the project:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
```bash
npm init -y
```

3. Install core dependencies
```bash
npm install express sequelize sqlite3 zod
```

4. Install dev dependencies
```bash
npm install -D typescript @types/node @types/express ts-node-dev @types/sequelize
```

5. Configure TypeScript
```bash
npx tsc --init
```

6. Create directory structure
```bash
mkdir -p src/{config,models,routes,seeders,migrations}
```

## Phase 2: Database Models

1. [Word Model](../lang_portal_ts/backend/src/models/Word.ts)
2. [Group Model](../lang_portal_ts/backend/src/models/Group.ts)
3. [WordGroup Model](../lang_portal_ts/backend/src/models/WordGroup.ts)
4. [StudySession Model](../lang_portal_ts/backend/src/models/StudySession.ts)
5. [StudyActivity Model](../lang_portal_ts/backend/src/models/StudyActivity.ts)
6. [WordReview Model](../lang_portal_ts/backend/src/models/WordReview.ts)
7. [Index File](../lang_portal_ts/backend/src/index.ts) 

## Phase 3: API Routes
1. [Dashboard Route](../lang_portal_ts/backend/src/routes/dashboard.ts) (`/api/dashboard/`)
2. [Words Route](../lang_portal_ts/backend/src/routes/words.ts) (`/api/words/`)
3. [Groups Route](../lang_portal_ts/backend/src/routes/groups.ts) (`/api/groups/`)
4. [Study Activities Route](../lang_portal_ts/backend/src/routes/study-activities.ts) (`/api/study-activities/`)
5. [Study Sessions Route](../lang_portal_ts/backend/src/routes/study-sessions.ts) (`/api/study-sessions/`)

## Phase 4: Data Seeding [link](../lang_portal_ts/backend/src/seeders) 
1. Basic vocabulary
2. Word groups
3. Study activities

## Phase 5: Testing & Documentation
1. API tests
```bash
# First, navigate to the backend directory
cd lang_portal_ts/backend

# Install dependencies if not already done
npm install

# Run the seeder
npm run seed

# Start the development server
npm run dev
```
- Documentation
- Example requests/responses

# Frontend Implementation Steps

## 1. Create project structure
```bash
cd lang_portal_ts
npx create-next-app@latest frontend --typescript --tailwind --app --use-npm
cd frontend
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
npm install -g shadcn-ui ## or npm install @shadcn/ui
npm install -D @shadcn/ui
```
## 2. The root layout with navigation


## 3. The redirect from '/' to '/dashboard'


## 4. The navigation bar component



# OPEA comps

### Docker install

[Website](https://docs.docker.com/engine/install/ubuntu/)

1. Set up Docker's apt repository.
```sh
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

2. Install the Docker packages
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. `Docker run` withoud `sudo`
```sh
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```










