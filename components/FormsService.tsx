"use client";
import Loading from "@/lib/Loading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { IService } from "@/app/api/services/interfaces";

const FormsService = ({ services, onSubmit }: { services: IService[] | undefined, onSubmit: (value: string | null) => void }) => {

  if (!services) return <Loading />

  return (
    <Card>
          <CardHeader>
            <CardTitle>Ajouter un service</CardTitle>
            <CardDescription>Ajouter votre service préféré en un clic</CardDescription>
          </CardHeader>
          <CardContent>
          <Select required onValueChange={(event) => { onSubmit(event); }}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un service" />
            </SelectTrigger>
            <SelectContent>
              {services?.map((service) => {
                return <SelectItem key={service.name} value={service.name}>{service.name}</SelectItem>
              })}
            </SelectContent>
          </Select>
          </CardContent>
    </Card>
  )
};

export default FormsService;