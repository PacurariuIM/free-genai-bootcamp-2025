import { getStudyActivity, getStudyActivitySessions } from "@/lib/api"
import SessionList from "@/components/study/session-list"

export default async function StudyActivityPage({ params }: { params: { id: string } }) {
  const [activity, sessions] = await Promise.all([
    getStudyActivity(parseInt(params.id)),
    getStudyActivitySessions(parseInt(params.id))
  ])

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src={activity.thumbnail} 
            alt={activity.name}
            className="w-full h-64 object-cover rounded-md"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{activity.name}</h1>
            <p className="text-muted-foreground">{activity.description}</p>
            <a
              href={activity.launchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90"
            >
              Launch Activity
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Study Sessions</h2>
        <SessionList sessions={sessions} />
      </div>
    </div>
  )
} 