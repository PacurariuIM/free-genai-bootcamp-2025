lang-portal-german/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── models/
│   │   │   ├── Group.ts
│   │   │   ├── StudyActivity.ts
│   │   │   ├── StudySession.ts
│   │   │   ├── Word.ts
│   │   │   ├── WordGroup.ts
│   │   │   ├── WordReview.ts
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   ├── dashboard.ts
│   │   │   ├── groups.ts
│   │   │   ├── studyActivities.ts
│   │   │   ├── studySessions.ts
│   │   │   └── words.ts
│   │   ├── seeders/
│   │   │   ├── data_adjectives.json
│   │   │   ├── data_nouns.json
│   │   │   ├── data_verbs.json
│   │   │   └── study_activities.json
│   │   ├── migrations/
│   │   │   └── initial-schema.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/
    │   │   └── ui/
    │   ├── hooks/
    │   │   └── use-mobile.ts
    │   ├── lib/
    │   │   └── utils.ts
    │   ├── pages/
    │   │   ├── Dashboard.tsx
    │   │   ├── Groups.tsx
    │   │   ├── GroupShow.tsx
    │   │   ├── Sessions.tsx
    │   │   ├── Settings.tsx
    │   │   ├── StudyActivities.tsx
    │   │   ├── StudyActivityLaunch.tsx
    │   │   ├── StudyActivityShow.tsx
    │   │   ├── StudySessionShow.tsx
    │   │   ├── Words.tsx
    │   │   └── WordShow.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── .env
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    └── vite.config.ts