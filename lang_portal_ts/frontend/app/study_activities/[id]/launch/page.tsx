import { getStudyActivity } from "@/lib/api"
import LaunchForm from "@/components/study/launch-form"

export default async function LaunchPage({ params }: { params: { id: string } }) {
  const activity = await getStudyActivity(parseInt(params.id))

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Launch {activity.name}</h1>
      <LaunchForm activity={activity} />
    </div>
  )
} 