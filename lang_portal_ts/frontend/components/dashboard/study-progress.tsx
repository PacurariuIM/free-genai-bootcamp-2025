import { StudyProgress } from "@/lib/types"

export function StudyProgressCard({ progress }: { progress: StudyProgress }) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">Study Progress</h2>
      <div className="space-y-4">
        <div className="w-full bg-secondary rounded-full h-4">
          <div 
            className="bg-primary h-4 rounded-full transition-all"
            style={{ width: `${progress.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span>{progress.totalWordsStudied} words studied</span>
          <span>{progress.totalWordsAvailable} total words</span>
        </div>
      </div>
    </div>
  )
} 