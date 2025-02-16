import Link from "next/link"
import { Group, PaginatedResponse } from "@/lib/types"
import { Pagination } from "@/components/ui/pagination"

export function GroupsTable({ groups }: { groups: PaginatedResponse<Group> }) {
  const totalPages = Math.ceil(groups.total / groups.perPage)

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left">Group Name</th>
                <th className="px-4 py-3 text-right">Words</th>
              </tr>
            </thead>
            <tbody>
              {groups.data.map(group => (
                <tr key={group.id} className="border-b">
                  <td className="px-4 py-3">
                    <Link 
                      href={`/groups/${group.id}`}
                      className="text-primary hover:underline"
                    >
                      {group.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right">{group.wordCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination 
        currentPage={groups.page} 
        totalPages={totalPages}
        baseUrl="/groups"
      />
    </div>
  )
} 