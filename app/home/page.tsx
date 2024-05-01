"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <Card className="w-1/3 h-2/3 grid shadow-lg">
      <CardHeader className="self-center">
        <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Bienvenue sur votre Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-7 [&:not(:first-child)]:mt-6">Sur cette page vous aurez un aperçu de tous les widgets que vous avez créés.</p>
      </CardContent>
      <CardFooter className="self-end">
        <Alert>
          <AlertTitle>PSSST !!! Prêt à créer ton widget ?</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p className="leading-7 [&:not(:first-child)]:mt-6">{"Lance-toi dans la création d\'un nouveau widget"}</p>
              <Button onClick={() => router.push('/services')}>Commencer</Button>
            </AlertDescription>
          </Alert>
      </CardFooter>
    </Card>
  );
}
