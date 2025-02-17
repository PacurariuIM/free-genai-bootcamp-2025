import { LastStudySession, StudyProgress, QuickStats, StudyActivity, StudySession, Word, PaginatedResponse, Group, GroupDetails } from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const getLastStudySession = () => fetchApi('/dashboard/last_study_session');
export const getStudyProgress = () => fetchApi('/dashboard/study_progress');
export const getQuickStats = () => fetchApi('/dashboard/quick_stats');

export async function getStudyActivities(): Promise<StudyActivity[]> {
  const response = await fetchApi('/study-activities');
  return response.data;
}

export async function getStudyActivity(id: number): Promise<StudyActivity> {
  return fetchApi(`/study-activities/${id}`);
}

export async function getStudyActivitySessions(id: number): Promise<PaginatedResponse<StudySession>> {
  const sessions = await fetchApi(`/study-activities/${id}/study-sessions`);
  
  return {
    data: sessions,
    total: sessions.length,
    page: 1,
    perPage: sessions.length
  };
}

export async function getWords(page: number = 1, perPage: number = 50): Promise<PaginatedResponse<Word>> {
  const res = await fetch(`${API_BASE_URL}/words?page=${page}&perPage=${perPage}`)
  return res.json()
}

export async function getWord(id: number): Promise<Word & { groups: { id: number; name: string }[] }> {
  const res = await fetch(`${API_BASE_URL}/words/${id}`)
  return res.json()
}

export async function getGroups(page: number = 1): Promise<PaginatedResponse<Group>> {
  const response = await fetchApi(`/groups?page=${page}`);
  return response;
}

export async function getGroup(id: number): Promise<GroupDetails> {
  return fetchApi(`/groups/${id}`);
}

export async function getGroupWords(id: number, page: number = 1): Promise<PaginatedResponse<Word>> {
  const res = await fetch(`${API_BASE_URL}/groups/${id}/words?page=${page}`)
  return res.json()
}

export async function getGroupSessions(id: number, page: number = 1): Promise<PaginatedResponse<StudySession>> {
  const res = await fetch(`${API_BASE_URL}/groups/${id}/study-sessions?page=${page}`)
  return res.json()
}

export async function getStudySessions(page: number = 1): Promise<PaginatedResponse<StudySession>> {
  const res = await fetch(`${API_BASE_URL}/study-sessions?page=${page}`)
  return res.json()
}

export async function getStudySession(id: number): Promise<StudySession & { words: Word[] }> {
  const res = await fetch(`${API_BASE_URL}/study-sessions/${id}`)
  return res.json()
}

export async function resetHistory(): Promise<void> {
  await fetch(`${API_BASE_URL}/settings/reset-history`, {
    method: 'POST',
  })
}

export async function fullReset(): Promise<void> {
  await fetch(`${API_BASE_URL}/settings/full-reset`, {
    method: 'POST',
  })
} 