import { QuickStats } from "@/lib/types"

export function QuickStatsCard({ stats }: { stats: QuickStats }) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Success Rate</p>
          <p className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Study Sessions</p>
          <p className="text-2xl font-bold">{stats.totalStudySessions}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Active Groups</p>
          <p className="text-2xl font-bold">{stats.totalActiveGroups}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Study Streak</p>
          <p className="text-2xl font-bold">{stats.studyStreak} days</p>
        </div>
      </div>
    </div>
  )
} 