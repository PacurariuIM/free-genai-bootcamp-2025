import { getStudySessions } from "@/lib/api"
import SessionList from "@/components/study/session-list"

export default async function StudySessionsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const sessions = await getStudySessions(page)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Study Sessions</h1>
      <SessionList sessions={sessions} />
    </div>
  )
} 