"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const Login = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  return (
    <div className="w-screen h-screen flex">
      <div className="bg-[#18181B] w-1/2 max-lg:hidden"></div>
      <div className="lg:w-1/2 w-full p-8 flex flex-col items-center">
        <div className="w-full flex justify-end">
          <Button onClick={ () => router.push("/register") } variant={"ghost"}>S&apos;inscrire</Button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Login
