# API SPECIFICATION

API endpoints needed to power this page:

## GET /api/dashboard/last_study_session
Returns information about the most recent study session.

### JSON Response
```json
{
  "id": 1,
  "startedAt": "2024-03-20T15:30:00Z",
  "endedAt": "2024-03-20T15:45:00Z",
  "groupId": 1,
  "groupName": "Basic Vocabulary",
  "totalWords": 20,
  "correctCount": 15,
  "incorrectCount": 5,
  "accuracy": 75
}
  ```

## GET /api/dashboard/study_progress
Returns study progress over time (last 7 days).
Frontend will determine progress bar based on total words studied and total available words.

### JSON Response
```json
{
  "totalWordsStudied": 100,
  "totalWordsAvailable": 200,
  "progress": 50
}
```

## GET /api/dashboard/quick_stats
Returns summary statistics for the dashboard.

### JSON Response
```json
{
  "successRate": 80,
  "totalStudySessions": 4,
  "totalActiveGroups": 2,
  "studyStreak": 3
}
```

## GET /api/study_activities/:id
Returns details about a specific study activity.

### JSON Response
```json
{
  "id": 1,
  "name": "Flashcards",
  "description": "Practice vocabulary with digital flashcards",
  "thumbnail": "flashcards.jpg",
  "launchUrl": "https://example.com/flashcards"
}
```

## GET /api/study_activities/:id/study_sessions
Returns paginated list of study sessions for a specific activity.

### JSON Response
```json
{
  "total": 50,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "activityName": "Flashcards",
      "groupName": "Basic Vocabulary",
      "startTime": "2024-03-20T15:30:00Z",
      "endTime": "2024-03-20T15:45:00Z",
      "reviewItemsCount": 20
    }
  ]
}
```

## POST /api/study-activities
Creates a new study session.

### Request params
- group_id: id of the group
- study_activity_id: id of the study activity

### JSON Response
```json
{
  "id": 1,
  "groupId": 1,
}
```

## GET /api/words
Returns paginated list of words with 100 items per page

### JSON Response
```json
{
  "total": 1000,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "german": "Hallo",
      "english": "Hello",
      "correctCount": 10,
      "wrongCount": 2
    }
  ]
}
```

## GET /api/words/:id
Returns detailed information about a specific word.

### JSON Response
```json
{
  "id": 1,
  "german": "Hallo",
  "english": "Hello",
  "correctCount": 10,
  "wrongCount": 2,
  "groups": [
    {
      "id": 1,
      "name": "Basic Vocabulary"
    }
  ]
}
```

## GET /api/groups
Returns paginated list of word groups.

### JSON Response
```json
{
  "total": 20,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "name": "Basic Vocabulary",
      "wordCount": 50
    }
  ]
}
```

## GET /api/groups/:id
Returns detailed information about a specific word group.

### JSON Response
```json
{
  "id": 1,
  "name": "Basic Vocabulary",
  "wordCount": 50,
  "totalStudySessions": 10,
  "averageSuccessRate": 75
}
```

## GET /api/groups/:id/words
Returns paginated list of words in a specific word group.

### JSON Response
```json
{
  "total": 50,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "german": "Hallo",
      "english": "Hello",
      "correctCount": 10,
      "wrongCount": 2
    }
  ]
}
```

## GET /api/groups/:id/study-sessions
Returns paginated list of study sessions for a specific word group.

### JSON Response
```json
{
  "total": 30,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "startTime": "2024-03-20T15:30:00Z",
      "endTime": "2024-03-20T15:45:00Z",
      "successRate": 75,
      "wordCount": 20
    }
  ]
}
```

## GET /api/study-sessions
Returns paginated list of study sessions.

### JSON Response
```json
{
  "total": 100,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "activityName": "Flashcards",
      "groupName": "Basic Vocabulary",
      "startTime": "2024-03-20T15:30:00Z",
      "endTime": "2024-03-20T15:45:00Z",
      "reviewItemsCount": 20
    }
  ]
}
```

## GET /api/study_sessions/:id
Returns detailed information about a specific study session.

### JSON Response
```json
{
  "id": 1,
  "activityName": "Flashcards",
  "groupName": "Basic Vocabulary",
  "startTime": "2024-03-20T15:30:00Z",
  "endTime": "2024-03-20T15:45:00Z",
  "reviewItemsCount": 20,
  "successRate": 75
}
```

## GET /api/study_sessions/:id/words
Returns paginated list of words in a specific study session.

### JSON Response
```json
{
  "total": 20,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "german": "Hallo",
      "english": "Hello",
      "correct": true,
      "reviewedAt": "2024-03-20T15:31:00Z"
    }
  ]
}
```

## POST /api/settings/reset_history
Resets the study history.

### JSON Response
```json
{
  "success": true,
  "message": "Study history has been reset successfully"
}
```

## POST /api/settings/full_reset
Performs a complete reset of the application data.

### JSON Response
```json
{
  "success": true,
  "message": "Application has been reset successfully"
}
```

## POST /api/study_sessions/:id/words/:word_id/review
Records a word review during a study session.

### Request Params
- id: id of the study session (integer)
- word_id: id of the word (integer)
- correct: boolean indicating if the word was reviewed correctly (boolean)

### Request Body
```json
{
  "correct": true
}
```

### JSON Response
```json
{
  "success": true,
  "wordId": 1,
  "sessionId": 1,
  "correct": true,
  "reviewedAt": "2024-03-20T15:31:00Z"
}
```



