'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectContent } from "./ui/select"
import { IParam } from "@/app/api/services/interfaces"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

const UniversalInput = ({ param, onChange } : { param: IParam, onChange: (event: any) => void }) => {
  return (
    <div>
      <Label htmlFor={param.desc}>{param.desc}</Label>
      {(param.type === "string") ? <Input id={param.desc} required onChange={onChange}/> : null}
    </div>
  )
}

const FormsWidget = ({ service }: { service : string }) => {
  const availaibleWidgets = [
    {
      name: "City Temperature",
      description: "Display temperature for a city",
      path : "current.json",
      type : "GET",
      params : [
        {
          name: "q",
          desc: "City",
          type: "string"
        }
      ]
    }
  ]
  const [ selectedWidget, setSelectedWidget] = useState<string | null>(null)
  const form = useForm()
  async function onSubmit(values: any) {
    if (!selectedWidget) return
    const widget = availaibleWidgets.find(widget => widget.name === selectedWidget)
    if (!widget) return
    const body = []

    body.push({ key: 'service', value: service })
    body.push({ key: 'widget', value: widget.name })
    const params = Object.entries(values)
    .map(([key, value]) => [key, value])
    .filter(([key, _]) => typeof key === 'string' && key.startsWith('param-'));
    params.map(([key, value]) => {
      if (typeof key === 'string')
        key = key.split('-')[1];
      body.push({ key, value });
    });
    const res = await fetch(`api/services/service`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    if (!res.ok) return
    const data = await res.json()
    console.log(data)
  }
  return (
    <Card className="w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Ajouter un widget</CardTitle>
            <CardDescription>Ajouter votre widget préféré en un clic</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input required placeholder="Nom du widget" {...field} />
                  </FormControl>
                  <FormDescription>
                    Donner un nom à votre widget
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="widgets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Widgets</FormLabel>
                  <FormControl>
                    <Select {...field} required onValueChange={(event) => { setSelectedWidget(event); field.onChange(event); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un widget" />
                      </SelectTrigger>
                      <SelectContent>
                        {availaibleWidgets.map((widget, index) => {
                          return <SelectItem key={widget.name} value={widget.name}>{widget.name}</SelectItem>
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Sélectionner l&apos;un des widgets disponible
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              { selectedWidget &&
                availaibleWidgets.find(widget => widget.name === selectedWidget)?.params.map((param, index) => {
                  return (
                    <FormField
                      key={param.name}
                      control={form.control}
                      name={`param-${param.name}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <UniversalInput onChange={field.onChange} param={param}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                })
              }
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Créer</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default FormsWidget