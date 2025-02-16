import { LastStudySession, StudyProgress, QuickStats, StudyActivity, StudySession, Word, PaginatedResponse, Group, GroupDetails } from "@/lib/types"

const API_BASE = 'http://localhost:3001/api'

export async function getLastStudySession(): Promise<LastStudySession | null> {
  const res = await fetch(`${API_BASE}/dashboard/last_study_session`)
  return res.json()
}

export async function getStudyProgress(): Promise<StudyProgress> {
  const res = await fetch(`${API_BASE}/dashboard/study_progress`)
  return res.json()
}

export async function getQuickStats(): Promise<QuickStats> {
  const res = await fetch(`${API_BASE}/dashboard/quick_stats`)
  return res.json()
}

export async function getStudyActivities(): Promise<StudyActivity[]> {
  const res = await fetch(`${API_BASE}/study-activities`)
  return res.json()
}

export async function getStudyActivity(id: number): Promise<StudyActivity> {
  const res = await fetch(`${API_BASE}/study-activities/${id}`)
  return res.json()
}

export async function getStudyActivitySessions(id: number): Promise<PaginatedResponse<StudySession>> {
  const res = await fetch(`${API_BASE}/study-activities/${id}/study-sessions`)
  const sessions = await res.json()
  
  // Transform the array response into a paginated response
  return {
    data: sessions,
    total: sessions.length,
    page: 1,
    perPage: sessions.length
  }
}

export async function getWords(page: number = 1, perPage: number = 50): Promise<PaginatedResponse<Word>> {
  const res = await fetch(`${API_BASE}/words?page=${page}&perPage=${perPage}`)
  return res.json()
}

export async function getWord(id: number): Promise<Word & { groups: { id: number; name: string }[] }> {
  const res = await fetch(`${API_BASE}/words/${id}`)
  return res.json()
}

export async function getGroups(page: number = 1): Promise<PaginatedResponse<Group>> {
  const res = await fetch(`${API_BASE}/groups?page=${page}`)
  return res.json()
}

export async function getGroup(id: number): Promise<GroupDetails> {
  const res = await fetch(`${API_BASE}/groups/${id}`)
  return res.json()
}

export async function getGroupWords(id: number, page: number = 1): Promise<PaginatedResponse<Word>> {
  const res = await fetch(`${API_BASE}/groups/${id}/words?page=${page}`)
  return res.json()
}

export async function getGroupSessions(id: number, page: number = 1): Promise<PaginatedResponse<StudySession>> {
  const res = await fetch(`${API_BASE}/groups/${id}/study-sessions?page=${page}`)
  return res.json()
}

export async function getStudySessions(page: number = 1): Promise<PaginatedResponse<StudySession>> {
  const res = await fetch(`${API_BASE}/study-sessions?page=${page}`)
  return res.json()
}

export async function getStudySession(id: number): Promise<StudySession & { words: Word[] }> {
  const res = await fetch(`${API_BASE}/study-sessions/${id}`)
  return res.json()
}

export async function resetHistory(): Promise<void> {
  await fetch(`${API_BASE}/settings/reset-history`, {
    method: 'POST',
  })
}

export async function fullReset(): Promise<void> {
  await fetch(`${API_BASE}/settings/full-reset`, {
    method: 'POST',
  })
} 