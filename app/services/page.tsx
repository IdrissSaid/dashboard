import FormsWidget from "@/components/FormsWidget"
import { Suspense } from "react"

const Services = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Suspense fallback={<div className="w-screen h-screen items-center justify-center">Chargement...</div>}>
        <FormsWidget service="weather" />
      </Suspense>
    </div>
  )
}

export default Services
