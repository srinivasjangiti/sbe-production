"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"

export function useAdminAuth() {
  const router = useRouter()
  const [authed, setAuthed] = useState<boolean>(false)

  useEffect(() => {
    let active = true

    async function check() {
      const valid = await isAuthenticated()
      if (!active) return

      if (valid) {
        setAuthed(true)
      } else {
        setAuthed(false)
        router.replace("/admin/login")
      }
    }

    check()

    return () => {
      active = false
    }
  }, [router])

  return authed
}
