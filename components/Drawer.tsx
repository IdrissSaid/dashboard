import { ReactNode, useState } from "react"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { Button } from "./ui/button"

const MyDrawer = ({ children, className, onClick, open = false, setOpen } : { children?: ReactNode, className: string, onClick: any, open?: boolean, setOpen: any }) => {
  return (
    <Drawer open={open}>
    <DrawerContent className={className}>
      <DrawerHeader className="flex flex-col gap-10">
        <DrawerTitle className="text-3xl">Panel de configuration</DrawerTitle>
        <DrawerDescription className="flex items-center">
          {children}
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter className="flex flex-row justify-end">
        <Button variant="outline" onClick={() => {
          setOpen(false);
        }}>Cancel</Button>
        <Button onClick={() => {
          onClick();
          setOpen(false)
        }}>Enregistrer</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}

export default MyDrawer
