export interface LastStudySession {
  id: number
  startedAt: string
  endedAt: string
  groupName: string
  totalWords: number
  correctCount: number
  incorrectCount: number
  accuracy: number
}

export interface StudyProgress {
  totalWordsStudied: number
  totalWordsAvailable: number
  progress: number
}

export interface QuickStats {
  successRate: number
  totalStudySessions: number
  totalActiveGroups: number
  studyStreak: number
}

export interface StudyActivity {
  id: number
  name: string
  description: string
  thumbnail: string
  launchUrl: string
}

export interface StudySession {
  id: number
  activityName: string
  groupName: string
  startTime: string
  endTime: string | null
  reviewItemsCount: number
}

export interface Word {
  id: number
  german: string
  english: string
  correctCount: number
  wrongCount: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
}

export interface Group {
  id: number
  name: string
  wordCount: number
}

export interface GroupDetails extends Group {
  totalStudySessions: number
  averageSuccessRate: number
} 