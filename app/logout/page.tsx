"use client"
import { useEffect } from "react"
import { logout } from "./logout"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const Logout = () => {
  const router = useRouter()
  useEffect(() => {
    const logoutAccount = async () => {
      await logout()
      signOut({
        callbackUrl: "/login",
        redirect: true
      })
    }
    logoutAccount()
  })

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <h3 className="scroll-m-20 text-2xl tracking-tight">
        Déconnections en cours ...
      </h3>
    </div>
  )
}

export default Logout
