import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { User } from "lucide-react"
import FormSession from "./form-Session"

export function MenuSession() {

  

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="px-2 lg:px-4 py-1 text-sm">          
          <User strokeWidth={'2'} className="cursor-pointer" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Inicar sesion</SheetTitle>
          <SheetDescription>
            Sistema de inicio de sesión de usuarios
          </SheetDescription>
        </SheetHeader>
        <FormSession />
      </SheetContent>
    </Sheet>
  )
}
