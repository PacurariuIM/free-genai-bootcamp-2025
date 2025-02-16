"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { resetHistory, fullReset } from "@/lib/api"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [isResetting, setIsResetting] = useState(false)
  const [isFullResetting, setIsFullResetting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResetHistory = async () => {
    if (!confirm("Are you sure you want to reset all study history? This cannot be undone.")) {
      return
    }

    setError(null)
    setIsResetting(true)
    try {
      await resetHistory()
      window.location.reload()
    } catch (error) {
      setError('Failed to reset history. Please try again.')
    } finally {
      setIsResetting(false)
    }
  }

  const handleFullReset = async () => {
    if (!confirm("Are you sure you want to perform a full reset? This will delete ALL data and recreate with seed data. This cannot be undone.")) {
      return
    }

    setError(null)
    setIsFullResetting(true)
    try {
      await fullReset()
      window.location.reload()
    } catch (error) {
      setError('Failed to perform full reset. Please try again.')
    } finally {
      setIsFullResetting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Theme</h2>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full max-w-xs p-2 border rounded-md bg-background"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="rounded-lg border p-4 space-y-4">
          <h2 className="text-xl font-semibold">Reset Options</h2>
          
          <div>
            <h3 className="font-medium mb-2">Reset Study History</h3>
            <p className="text-sm text-muted-foreground mb-2">
              This will delete all study sessions and word review items, but keep words and groups intact.
            </p>
            <button
              onClick={handleResetHistory}
              disabled={isResetting}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {isResetting ? 'Resetting...' : 'Reset History'}
            </button>
          </div>

          <div>
            <h3 className="font-medium mb-2">Full Reset</h3>
            <p className="text-sm text-muted-foreground mb-2">
              This will delete all data and recreate the database with seed data.
            </p>
            <button
              onClick={handleFullReset}
              disabled={isFullResetting}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {isFullResetting ? 'Resetting...' : 'Full Reset'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 