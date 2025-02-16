import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={`${baseUrl}?page=${currentPage - 1}`}
        className={`px-4 py-2 text-sm rounded-md border ${
          currentPage <= 1 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-muted'
        }`}
        aria-disabled={currentPage <= 1}
      >
        Previous
      </Link>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={`${baseUrl}?page=${currentPage + 1}`}
        className={`px-4 py-2 text-sm rounded-md border ${
          currentPage >= totalPages 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-muted'
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </Link>
    </div>
  )
} 