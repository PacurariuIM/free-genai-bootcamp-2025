# Lang Portal API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API does not require authentication.

## Endpoints

### Dashboard

#### Get Last Study Session
```
GET /dashboard/last_study_session
```
Returns details about the most recent study session.

**Response**
```json
{
  "id": 1,
  "startedAt": "2024-02-20T10:00:00Z",
  "endedAt": "2024-02-20T10:30:00Z",
  "groupId": 1,
  "groupName": "Beginner Words",
  "totalWords": 10,
  "correctCount": 8,
  "incorrectCount": 2,
  "accuracy": 80
}
```

#### Get Study Progress
```
GET /dashboard/study_progress
```
Returns overall study progress statistics.

**Response**
```json
{
  "totalWordsStudied": 50,
  "totalWordsAvailable": 100,
  "progress": 50
}
```

#### Get Quick Stats
```
GET /dashboard/quick_stats
```
Returns key statistics about study performance.

**Response**
```json
{
  "successRate": 75.5,
  "totalStudySessions": 20,
  "totalActiveGroups": 5,
  "studyStreak": 3
}
```

### Words

#### List Words
```
GET /words?page=1&perPage=100
```
Returns a paginated list of words.

**Query Parameters**
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Items per page (default: 100)

**Response**
```json
{
  "total": 150,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "german": "groß",
      "english": "big",
      "correctCount": 5,
      "wrongCount": 2
    }
  ]
}
```

#### Get Word Details
```
GET /words/:id
```
Returns detailed information about a specific word.

**Response**
```json
{
  "id": 1,
  "german": "groß",
  "english": "big",
  "correctCount": 5,
  "wrongCount": 2,
  "groups": [
    {
      "id": 1,
      "name": "Adjectives"
    }
  ]
}
```

#### Create Word
```
POST /words
```

**Request Body**
```json
{
  "german": "klein",
  "english": "small"
}
```

**Response**
```json
{
  "id": 2,
  "german": "klein",
  "english": "small",
  "createdAt": "2024-02-20T12:00:00Z",
  "updatedAt": "2024-02-20T12:00:00Z"
}
```

### Groups

#### List Groups
```
GET /groups?page=1&perPage=100
```
Returns a paginated list of word groups.

**Query Parameters**
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Items per page (default: 100)

**Response**
```json
{
  "total": 5,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "name": "Adjectives",
      "wordCount": 20
    }
  ]
}
```

#### Get Group Details
```
GET /groups/:id
```
Returns detailed information about a specific group.

**Response**
```json
{
  "id": 1,
  "name": "Adjectives",
  "wordCount": 20,
  "totalStudySessions": 5,
  "averageSuccessRate": 75.5
}
```

### Study Sessions

#### List Study Sessions
```
GET /study_sessions?page=1&perPage=100
```
Returns a paginated list of study sessions.

**Response**
```json
{
  "total": 20,
  "page": 1,
  "perPage": 100,
  "data": [
    {
      "id": 1,
      "activityName": "Flashcards",
      "groupName": "Beginner Words",
      "startTime": "2024-02-20T10:00:00Z",
      "endTime": "2024-02-20T10:30:00Z",
      "reviewItemsCount": 10
    }
  ]
}
```

#### Create Study Session
```
POST /study_sessions
```

**Request Body**
```json
{
  "groupId": 1,
  "studyActivityId": 1
}
```

**Response**
```json
{
  "id": 1,
  "groupId": 1,
  "studyActivityId": 1,
  "startedAt": "2024-02-20T10:00:00Z"
}
```

#### Submit Word Review
```
POST /study_sessions/:id/words/:word_id/review
```

**Request Body**
```json
{
  "correct": true
}
```

**Response**
```json
{
  "success": true,
  "wordId": 1,
  "sessionId": 1,
  "correct": true,
  "reviewedAt": "2024-02-20T10:05:00Z"
}
```

### Study Activities

#### List Study Activities
```
GET /study_activities
```
Returns a list of available study activities.

**Response**
```json
[
  {
    "id": 1,
    "name": "Flashcards",
    "description": "Practice with digital flashcards",
    "thumbnail": "flashcards.png",
    "launchUrl": "/activities/flashcards"
  }
]
```

#### Get Study Activity Details
```
GET /study_activities/:id
```
Returns detailed information about a specific study activity.

**Response**
```json
{
  "id": 1,
  "name": "Flashcards",
  "description": "Practice with digital flashcards",
  "thumbnail": "flashcards.png",
  "launchUrl": "/activities/flashcards"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_type",
      "path": ["body", "correct"],
      "message": "Expected boolean, received string"
    }
  ]
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```