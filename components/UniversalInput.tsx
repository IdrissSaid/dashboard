import { IParam } from "@/app/api/services/interfaces"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const UniversalInput = ({ param, onChange } : { param: IParam, onChange: (event: any) => void }) => {
  return (
    <div>
      <Label htmlFor={param.desc}>{param.desc}</Label>
      {(param.type === "string") ? <Input id={param.desc} required onChange={onChange}/> : null}
    </div>
  )
}


export default UniversalInput