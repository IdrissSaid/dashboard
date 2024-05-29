import getValueWithKey from "@/lib/getValueWithKey"
import { Card, CardContent, CardTitle } from "./ui/card"
import { useEffect, useState } from "react"
import { IKeyValue, ISavedConfig } from "@/app/api/services/interfaces"
import SavedServicesConfig from "./SavedServicesConfig"
import { Bounce, toast } from "react-toastify"
import { Badge } from "./ui/badge"
import { Pencil } from "lucide-react"
import { Button } from "./ui/button"

const SavedServicesComponent = ({savedService} : {savedService: IKeyValue}) => {
  const [ config, setConfig] = useState<string[]>(["", "", "", "", "", ""])
  const [ configLoaded, setConfigLoaded ] = useState(false)
  const [ openConfig, setOpenConfig ] = useState(false)

  useEffect(() => {
    const getConfig = async () => {
      const res = await fetch(`/api/services/savedConfig/${savedService._id}`, {
        method: 'GET',
      })
      if (!res.ok) return
      const data = await res.json().then(res => res.savedConfig) as ISavedConfig
      setConfig(data.config)
      setConfigLoaded(true)
    }
    getConfig()
  }, [savedService, openConfig])

  const handleSave = async () => {
    const res = await fetch('/api/services/savedConfig', {
      method: 'POST',
      body: JSON.stringify({config: config, savedService: savedService._id})
    })
    if (res.ok) {
      toast.success('Votre configuration a été créée', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
  <Card className="py-4 px-4">
    <CardTitle className="flex justify-between">
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">{getValueWithKey('Widget Name', savedService.data)}</p>
      <Button onClick={() => setOpenConfig(true)}><Pencil strokeWidth="1px" size="24px"/></Button>
    </CardTitle>
    <CardContent className="flex flex-col items-center justify-center p-6">
      {
        !configLoaded || openConfig ?
        <>
          <p>Faite afficher votre widget <label className="font-bold">{getValueWithKey('service', savedService.data)}</label></p>
        </> :
        <div className="grid grid-cols-3 grid-rows-2">
        {
          config.map(( item: string, index ) => {
            return (
              <p className="text-center" key={index}>{item}</p>
            )
          })
        }
        </div>
      }
      <SavedServicesConfig
        savedService={savedService}
        config={config}
        setConfig={setConfig}
        handleSave={handleSave}
        open={openConfig}
        setOpen={()=>setOpenConfig(!open)}
      />
    </CardContent>
  </Card>
  )
}

export default SavedServicesComponent