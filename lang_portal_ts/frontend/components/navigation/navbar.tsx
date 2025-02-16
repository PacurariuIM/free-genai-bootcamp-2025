"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const routes = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Study Activities", path: "/study_activities" },
  { name: "Words", path: "/words" },
  { name: "Groups", path: "/groups" },
  { name: "Settings", path: "/settings" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container flex h-14 items-center">
        <div className="flex gap-6 md:gap-10">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.path ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 