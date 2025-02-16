import { getLastStudySession, getStudyProgress, getQuickStats } from "@/lib/api"
import { LastSessionCard } from "@/components/dashboard/last-session"
import { StudyProgressCard } from "@/components/dashboard/study-progress"
import { QuickStatsCard } from "@/components/dashboard/quick-stats"

export default async function DashboardPage() {
  const [lastSession, progress, stats] = await Promise.all([
    getLastStudySession(),
    getStudyProgress(),
    getQuickStats()
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <LastSessionCard session={lastSession} />
      <StudyProgressCard progress={progress} />
      <QuickStatsCard stats={stats} />
    </div>
  )
} 