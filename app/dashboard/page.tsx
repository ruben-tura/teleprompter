import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/")
  }
  const user = session.user;

  return <div><h1>Hello {user.name}</h1></div>
}
