"use client"
import { IKeyValue } from "@/app/api/services/interfaces"
import getValueWithKey from "@/lib/getValueWithKey"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useState } from "react"

const SavedServices = () => {
  const [ savedServices, setSavedServices ] = useState<IKeyValue[]>([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/services/savedServices', { method: 'GET' })

      if (!res.ok) return
      const data = await res.json()
      setSavedServices(data.data)
    }
    getData()
  }, [])

  return (
    <Card className="w-1/3 h-2/3 shadow-lg">
      <CardContent className="flex items-center justify-center py-4 h-full">
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full"
        >
        <CarouselContent className="h-[450px] -mt-1">
          {savedServices?.map((widget, index) => {
            console.log(widget)
            return (
              <CarouselItem key={index} className="pt-1 md:basis-1/4">
                <Card className="py-4">
                  <CardTitle className="leading-7 [&:not(:first-child)]:mt-6 text-center">{getValueWithKey('Widget Name', widget.data)}</CardTitle>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  )
}

export default SavedServices
