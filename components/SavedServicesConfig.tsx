import MyDrawer from "./Drawer"
import { CirclePlus } from "lucide-react"
import { Badge } from "./ui/badge"
import { Dispatch, SetStateAction, useState } from "react"
import { Card, CardContent, CardTitle } from "./ui/card"
import { IKeyValue } from "@/app/api/services/interfaces"
import getValueWithKey from "@/lib/getValueWithKey"

interface SavedServicesConfigProps {
  savedService: IKeyValue;
  handleSave: any;
  config: string[];
  setConfig: Dispatch<SetStateAction<string[]>>;
  open?: boolean;
  setOpen: any;
}

const SavedServicesConfig = ({ savedService, handleSave, config, setConfig, open, setOpen }: SavedServicesConfigProps) => {
  const [selected, setSelected] = useState("")

  const handleBadgeClick = (index: any, item: any) => {
    const newConfig = [...config];
    newConfig[index] = item;
    setConfig(newConfig);
    setSelected("")
  };

  const handleCirclePlusClick = (index: any) => {
    if (selected !== null) {
      const newConfig = [...config];
      newConfig[index] = selected;
      setConfig(newConfig);
      setSelected("");
    }
  };

  return (
    <MyDrawer className="" onClick={handleSave} open={open} setOpen={setOpen}>
    <div className="flex gap-7 w-full items-center justify-center">
      <Card className="py-4 px-4 w-1/3 ">
        <CardTitle className="leading-7 [&:not(:first-child)]:mt-6 text-center">
          Data
        </CardTitle>
        <CardContent>
          {savedService.result.map((item, index) => (
            <div key={index}>
              {Object.entries(item).filter(([key, value]) => key !== 'type' && !config.includes(value as string)).map(([key, value]) => {
                return (
                  <div key={key} className="flex justify-between my-3">
                    <p className="leading-7">{key}</p>
                    <Badge
                      onClick={() => setSelected(value as string)}
                      variant={selected && selected != value ? "secondary" : "default"}
                      className="leading-7 cursor-pointer">
                        {value as string}
                    </Badge>
                  </div>
                )
              })}
            </div>
          ))}
      </CardContent>
      </Card>
      <Card className="flex flex-col py-4 px-4 w-1/3 gap-4">
        <CardTitle className="leading-7 [&:not(:first-child)]:mt-6 text-center">
          {getValueWithKey('Widget Name', savedService.data)}
        </CardTitle>
        <CardContent>
          <div className="grid grid-cols-3 grid-rows-3">
            {
              config.map(( item, index ) => {
                return (
                  <Badge
                    key={index}
                    className="select-none cursor-pointer flex justify-center hover:border-black"
                    variant="outline"
                    onClick={() => {
                      item ? handleBadgeClick(index, selected) : handleCirclePlusClick(index)
                    }}
                  >
                    { item ? <Badge>{item}</Badge> : <CirclePlus strokeWidth={"1px"} size={"24px"}/>}
                  </Badge>
                )
              })
            }
          </div>
        </CardContent>
      </Card>
    </div>
  </MyDrawer>
  )
}

export default SavedServicesConfig
