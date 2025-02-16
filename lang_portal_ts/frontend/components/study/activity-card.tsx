import Link from "next/link"
import { StudyActivity } from "@/lib/types"

export function ActivityCard({ activity }: { activity: StudyActivity }) {
  return (
    <div className="rounded-lg border p-4 space-y-4">
      <img 
        src={activity.thumbnail} 
        alt={activity.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-xl font-semibold">{activity.name}</h3>
      <div className="flex gap-2">
        <Link
          href={`/study_activities/${activity.id}/launch`}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Launch
        </Link>
        <Link
          href={`/study_activities/${activity.id}`}
          className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90"
        >
          View
        </Link>
      </div>
    </div>
  )
} 