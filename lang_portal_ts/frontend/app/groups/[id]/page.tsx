import { getGroup, getGroupWords, getGroupSessions } from "@/lib/api"
import { WordsTable } from "@/components/words/words-table"
import { SessionList } from "@/components/study/session-list"

export default async function GroupPage({ 
  params,
  searchParams,
}: { 
  params: { id: string }
  searchParams: { wordsPage?: string; sessionsPage?: string }
}) {
  const groupId = parseInt(params.id)
  const wordsPage = searchParams.wordsPage ? parseInt(searchParams.wordsPage) : 1
  const sessionsPage = searchParams.sessionsPage ? parseInt(searchParams.sessionsPage) : 1

  const [group, words, sessions] = await Promise.all([
    getGroup(groupId),
    getGroupWords(groupId, wordsPage),
    getGroupSessions(groupId, sessionsPage)
  ])

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{group.name}</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Total Words"
            value={group.wordCount}
          />
          <StatCard
            label="Study Sessions"
            value={group.totalStudySessions}
          />
          <StatCard
            label="Success Rate"
            value={`${group.averageSuccessRate.toFixed(1)}%`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Words</h2>
        <WordsTable 
          words={words} 
          baseUrl={`/groups/${group.id}?sessionsPage=${sessionsPage}&wordsPage=`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Study Sessions</h2>
        <SessionList 
          sessions={sessions} 
          baseUrl={`/groups/${group.id}?wordsPage=${wordsPage}&sessionsPage=`}
        />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
} 