import { getWords } from "@/lib/api"
import { WordsTable } from "@/components/words/words-table"

export default async function WordsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const words = await getWords(page)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Words</h1>
      <WordsTable words={words} />s
    </div>
  )
} 