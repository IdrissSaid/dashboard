'use client'
import FormsService from "@/components/FormsService"
import FormsWidget from "@/components/FormsWidget"
import { useEffect, useState } from "react"
import { IService } from "../api/services/interfaces"

const Services = () => {
  const [ service, setService ] = useState<IService | undefined>()
  const [error, setError] = useState('')
  const [services, setServices] = useState<IService[] | undefined>()

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/services/service`, { method: "GET" })
      if (!res.ok) {
        setError("Erreur lors du chargement")
        return
      }
      const data = await res.json()
      setServices(data.data)
      console.log(data.data)
    }
    getData()
  }, [])

  const onSubmit = (value: string | null) => {
    setService(services?.find(service => service.name === value))
  }
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      {
        !service ? <FormsService services={services} onSubmit={onSubmit}/> : <FormsWidget service={service} />
      }
    </div>
  )
}

export default Services
