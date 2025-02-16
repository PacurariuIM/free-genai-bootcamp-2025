import { getStudySession } from "@/lib/api"
import { WordsTable } from "@/components/words/words-table"

export default async function StudySessionPage({ params }: { params: { id: string } }) {
  const session = await getStudySession(parseInt(params.id))

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Study Session Details</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Activity"
            value={session.activityName}
          />
          <StatCard
            label="Group"
            value={session.groupName}
          />
          <StatCard
            label="Start Time"
            value={new Date(session.startTime).toLocaleString()}
          />
          <StatCard
            label="End Time"
            value={session.endTime ? new Date(session.endTime).toLocaleString() : 'Ongoing'}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Words Reviewed</h2>
        <div className="rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left">German</th>
                  <th className="px-4 py-3 text-left">English</th>
                  <th className="px-4 py-3 text-center">Result</th>
                </tr>
              </thead>
              <tbody>
                {session.words.map(word => (
                  <tr key={word.id} className="border-b">
                    <td className="px-4 py-3">{word.german}</td>
                    <td className="px-4 py-3">{word.english}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={word.correctCount > word.wrongCount ? "text-green-600" : "text-red-600"}>
                        {word.correctCount > word.wrongCount ? "Correct" : "Incorrect"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  )
} 