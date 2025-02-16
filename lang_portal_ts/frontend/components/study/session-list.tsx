import { StudySession } from "@/lib/types"
import { PaginatedResponse } from "@/lib/types"
import { Pagination } from "@/components/pagination"

export default function SessionList({ 
  sessions,
  baseUrl = "/sessions" // Default to /sessions if not provided
}: { 
  sessions: PaginatedResponse<StudySession>
  baseUrl?: string 
}) {
  const totalPages = Math.ceil(sessions.total / sessions.perPage)

  if (sessions.data.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No study sessions yet
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left">Group</th>
                <th className="px-4 py-3 text-left">Start Time</th>
                <th className="px-4 py-3 text-left">End Time</th>
                <th className="px-4 py-3 text-left">Review Items</th>
              </tr>
            </thead>
            <tbody>
              {sessions.data.map(session => (
                <tr key={session.id} className="border-b">
                  <td className="px-4 py-3">{session.groupName}</td>
                  <td className="px-4 py-3">{new Date(session.startTime).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {session.endTime ? new Date(session.endTime).toLocaleString() : 'Ongoing'}
                  </td>
                  <td className="px-4 py-3">{session.reviewItemsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination 
        currentPage={sessions.page} 
        totalPages={totalPages}
        baseUrl={baseUrl}
      />
    </div>
  )
} 