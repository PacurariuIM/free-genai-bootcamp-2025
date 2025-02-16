"use client"

import { useState } from "react"
import { StudyActivity } from "@/lib/types"

export default function LaunchForm({ activity }: { activity: StudyActivity }) {
  const [groupId, setGroupId] = useState<string>("")

  const handleLaunch = () => {
    if (!groupId) return
    
    const launchUrl = `${activity.launchUrl}?group_id=${groupId}`
    window.open(launchUrl, '_blank')
  }

  return (
    <div className="rounded-lg border p-6 space-y-4">
      <div className="space-y-2">
        <label htmlFor="group" className="text-sm font-medium">
          Select Group
        </label>
        <select
          id="group"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a group...</option>
          {/* We'll add group options later */}
        </select>
      </div>

      <button
        onClick={handleLaunch}
        disabled={!groupId}
        className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        Launch Activity
      </button>
    </div>
  )
} 