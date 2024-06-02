"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Loading from "@/lib/Loading"
import GoogleLogo from '@/public/google.png'
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {
  const [ credentials, setCredentials ] = useState({ email: "", password: "", type: "login" })
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState("")
  const router = useRouter()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(old => ({
      ...old,
      email: e.target?.value
    }));
    setError("");
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(old => ({
      ...old,
      password: e.target?.value
    }));
    setError("");
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const res = await signIn('credentials',  {
      email: credentials.email,
      password: credentials.password,
      type: credentials.type,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      console.error("Error ", res.error)
      setError("Votre adresse email ou votre mot de passe est incorrect(e).")
      return
    }
    router.replace('/dashboard')
  }

  return (
    <div className="h-full flex flex-col gap-6 items-center justify-center w-4/5">
      <h2 className="scroll-m-20 text-3xl font-semibold">Connectez-vous à votre compte</h2>
      <p className="text-sm text-muted-foreground">Saisissez vos identifiants ci-dessous pour vous connecter</p>
      <div className="w-3/4 flex flex-col gap-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input className={error ? 'border-red-400' : ''} autoComplete="username" value={credentials.email} onChange={handleEmailChange} type="email" placeholder="name@example.com"/>
          <Input className={error ? 'border-red-400' : ''} autoComplete="current-password" value={credentials.password} onChange={handlePasswordChange} type="password" placeholder="Mot de passe"/>
          { error && <Alert variant="destructive">
            <AlertDescription className="flex gap-3 items-center justify-center">
              <ExclamationTriangleIcon className="h-4 w-4" />{ error }
            </AlertDescription>
          </Alert> }
          <Button type="submit" className="w-full">
            { !loading ? <label>Se connecter</label> : <Loading/>}
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
          <div className="relative flex justify-center text-xs uppercase">
            <p className="bg-background px-2 text-sm text-muted-foreground">OU CONTINUER AVEC</p>
          </div>
        </div>
        <Button className="w-full flex gap-3" variant={"outline"} onClick={async () => {
          const res = await signIn("google", { redirect: false })
        }}>
          <Image alt="google" src={GoogleLogo} width={24} height={16}/>Google
        </Button>
      </div>
    </div>
  )
}

export default Login
