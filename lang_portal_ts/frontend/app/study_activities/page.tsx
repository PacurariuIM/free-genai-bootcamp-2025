import { getStudyActivities } from "@/lib/api"
import { ActivityCard } from "@/components/study/activity-card"

export default async function StudyActivitiesPage() {
  const activities = await getStudyActivities()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Study Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
} 