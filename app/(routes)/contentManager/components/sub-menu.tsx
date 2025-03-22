import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { EllipsisVertical, Coffee, Plus, Eye, ChartColumnStacked, MapPin, Percent } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useManager } from "@/hooks/use-manager";


const SubMenu = () => {
    const { addInfo } = useParams();
    const {setView} =useManager();

    return (
        <div className="w-full py-2 bg-gray-100 px-4">
            <Sheet>
                <SheetTrigger>
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-2 rounded cursor-pointer">
                            <EllipsisVertical />
                        </div>
                        {/* Agregar titulo "Sistema de gestion de contenido" con tailwindcss */}
                        <span className="text-lg font-semibold">Sistema de gestión de contenido</span>
                    </div>
                </SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetHeader>
                        <SheetTitle>Gestión de datos</SheetTitle>
                        <SheetDescription>
                            Toda la información de tu tienda en un solo lugar para que puedas administrarla de forma sencilla.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span className="flex gap-5 items-center">
                                        <Coffee size={18} /> Administrar cafés
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Link href="/contentManager/coffees" className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                        <Plus size={18} />
                                        <span>Agregar productos</span>
                                    </Link>
                                    {!addInfo ? (
                                        <button onClick={() => setView("coffees")} className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                            <Eye size={18} />
                                            <span>Ver productos</span>
                                        </button>
                                    ) : (
                                        <Link href={"/contentManager"} className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                            <Eye size={18} />
                                            <span>Ver productos</span>
                                        </Link>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    <span className="flex gap-5 items-center">
                                        <ChartColumnStacked size={18} /> Administrar categoria
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Link href="/contentManager/categories" className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                        <Plus size={18} />
                                        <span>Agregar categoria</span>
                                    </Link>
                                    {!addInfo ? (
                                        <button onClick={() => setView("categories")} className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                            <Eye size={18} />
                                            <span>Ver categoria</span>
                                        </button>
                                    ) : (
                                        <Link href={"/contentManager"} onClick={() => setView("categories")} className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                            <Eye size={18} />
                                            <span>Ver productos</span>
                                        </Link>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    <span className="flex gap-5 items-center">
                                        <MapPin size={18} /> Administrar origen
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Link href="/contentManager/origin" className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                        <Plus size={18} />
                                        <span>Agregar origen</span>
                                    </Link>
                                    {!addInfo ? (
                                        <button onClick={() => setView("origin")} className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                            <Eye size={18} />
                                            <span>Ver origenes</span>
                                        </button>
                                    ) : (
                                        <Link href={"/contentManager"} onClick={() => setView("origin")} className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                            <Eye size={18} />
                                            <span>Ver productos</span>
                                        </Link>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    <span className="flex gap-5 items-center">
                                        <Percent size={18} /> Gestionar ofertas
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Link href="/" className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                        <Plus size={18} />
                                        <span>Agregar ofertas</span>
                                    </Link>
                                    <Link href="/" className="flex gap-2 items-center hover:bg-gray-100 py-2 rounded-lg px-3">
                                        <Eye size={18} />
                                        <span>Ver ofertas</span>
                                    </Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default SubMenu;