import { LastStudySession } from "@/lib/types"

export function LastSessionCard({ session }: { session: LastStudySession | null }) {
  if (!session) {
    return (
      <div className="rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-4">Last Study Session</h2>
        <p className="text-muted-foreground">No study sessions yet</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">Last Study Session</h2>
      <div className="space-y-2">
        <p>Group: {session.groupName}</p>
        <p>Started: {new Date(session.startedAt).toLocaleString()}</p>
        <p>Ended: {session.endedAt ? new Date(session.endedAt).toLocaleString() : 'Ongoing'}</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Words</p>
            <p className="text-2xl font-bold">{session.totalWords}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Correct</p>
            <p className="text-2xl font-bold text-green-600">{session.correctCount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Incorrect</p>
            <p className="text-2xl font-bold text-red-600">{session.incorrectCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 