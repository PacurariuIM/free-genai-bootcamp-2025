import { getWord } from "@/lib/api"
import Link from "next/link"

export default async function WordPage({ params }: { params: { id: string } }) {
  const word = await getWord(parseInt(params.id))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{word.german}</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-muted-foreground">English</dt>
                <dd className="text-lg">{word.english}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-2">Statistics</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">Correct</dt>
                <dd className="text-2xl font-bold text-green-600">{word.correctCount}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Wrong</dt>
                <dd className="text-2xl font-bold text-red-600">{word.wrongCount}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Groups</h2>
          <div className="flex flex-wrap gap-2">
            {word.groups.map(group => (
              <Link
                key={group.id}
                href={`/groups/${group.id}`}
                className="px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20"
              >
                {group.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 