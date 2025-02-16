import Link from "next/link"
import { Word, PaginatedResponse } from "@/lib/types"
import { Pagination } from "@/components/ui/pagination"

export function WordsTable({ 
  words, 
  baseUrl = "/words"  // Default to /words if not provided
}: { 
  words: PaginatedResponse<Word>
  baseUrl?: string 
}) {
  const totalPages = Math.ceil(words.total / words.perPage)

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left">German</th>
                <th className="px-4 py-3 text-left">English</th>
                <th className="px-4 py-3 text-right">Correct</th>
                <th className="px-4 py-3 text-right">Wrong</th>
              </tr>
            </thead>
            <tbody>
              {words.data.map(word => (
                <tr key={word.id} className="border-b">
                  <td className="px-4 py-3">
                    <Link 
                      href={`/words/${word.id}`}
                      className="text-primary hover:underline"
                    >
                      {word.german}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{word.english}</td>
                  <td className="px-4 py-3 text-right text-green-600">{word.correctCount}</td>
                  <td className="px-4 py-3 text-right text-red-600">{word.wrongCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination 
        currentPage={words.page} 
        totalPages={totalPages}
        baseUrl={baseUrl}
      />
    </div>
  )
} 