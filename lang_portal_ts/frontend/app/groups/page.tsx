import { getGroups } from "@/lib/api"
import { GroupsTable } from "@/components/groups/groups-table"

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const groups = await getGroups(page)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Word Groups</h1>
      <GroupsTable groups={groups} />
    </div>
  )
} 