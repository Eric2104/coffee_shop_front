import { Menu, Coffee, Percent, ShoppingBag, Package } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/shop", title: "Tienda", description: "Accede a tus pedidos y más.", icon: ShoppingBag },
  { href: "/offers", title: "Ofertas", description: "Promociones y descuentos especiales.", icon: Percent },
  { href: "/accesorios", title: "Accesorios", description: "Tazas, molinillos, prensas, etc.", icon: Package },
];

const coffeeTypes = [
  { href: "/cafe-espresso", title: "Espresso", description: "Fuerte y concentrado." },
  { href: "/cafe-americano", title: "Americano", description: "Suave y equilibrado." },
  { href: "/cafe-latte", title: "Latte", description: "Cremoso con leche." },
];

export function AppSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Menu />
          <span className="hidden md:inline">Menú</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 p-6 bg-white">
        {/* Encabezado */}
        <SheetHeader className="mb-6 text-center">
          <SheetTitle className="text-2xl font-bold text-brown-800 flex items-center justify-center gap-2">
            <Coffee className="w-6 h-6 text-brown-600" />
            CoffeeShop
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            Sumérgete en el mundo del café con productos de alta calidad.
          </SheetDescription>
        </SheetHeader>

        {/* Navegación */}
        <nav className="space-y-6">
          {/* Sección: Sobre nosotros */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-3">Sobre nosotros</h3>
            <ul className="space-y-2">
              {navLinks.map(({ href, title, description, icon: Icon }) => (
                <li key={title}>
                  <SheetClose asChild>
                    <Link href={href} className="flex items-center gap-3 text-gray-700 hover:text-brown-800 transition-colors">
                      <Icon className="w-5 h-5 text-brown-600" />
                      <div>
                        <span className="font-medium">{title}</span>
                        <p className="text-xs text-gray-500">{description}</p>
                      </div>
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>

          {/* Sección: Tipo de cafés */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tipos de café</h3>
            <ul className="space-y-2">
              {coffeeTypes.map(({ href, title, description }) => (
                <li key={title}>
                  <SheetClose asChild>
                    <Link
                      href={href}
                      className="block bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-brown-100 hover:shadow-md active:scale-95 transition-all"
                    >
                      <span className="font-medium text-brown-800">{title}</span>
                      <p className="text-sm text-gray-600">{description}</p>
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
