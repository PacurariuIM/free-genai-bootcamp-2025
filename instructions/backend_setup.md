# API SPECIFICATION

API endpoints needed to power this page:

- GET /api/dashboard/last_study_session
- GET /api/dashboard/study_progress
- GET /api/dashboard/quick_stats
- GET /api/study_activities/:id
- GET /api/study_activities/:id/study_sessions


- POST /api/study-activities
  - required params: group_id, study_activity_id

- GET /api/words
  - pagination with 100 items per page
- GET /api/words/:id
- GET /api/groups
  - pagination with 100 items per page
- GET /api/groups/:id
- GET /api/groups/:id/words
- GET /api/groups/:id/study-sessions
- GET /api/study-sessions
  - pagination with 100 items per page
- GET /api/study_sessions/:id
- GET /api/study_sessions/:id/words
- POST /api/settings/reset_history
- POST /api/settings/full_reset
- POST /api/study_sessions/:id/words/:word_id/review
  - required params: correct
