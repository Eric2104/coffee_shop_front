import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";


export function OptionsMenuUser() {

        const [roleUser, setRoleUser] = useState<string | null>(null);
        useEffect(() => {
            const storedRole = localStorage.getItem('role');
            setRoleUser(storedRole);
        }, []);

        const handleLogout = () => {
            localStorage.removeItem('token'); 
            localStorage.removeItem('role');
            window.location.reload();
        };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <User strokeWidth={'2'} className="cursor-pointer" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={"/profile"}>
                        Perfil
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Historial de compras
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Configuracion
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {(roleUser && roleUser === "ROLE_ADMIN") &&
                    <>
                        <DropdownMenuLabel>Administracion</DropdownMenuLabel>
                        <Link href={"/contentManager"}><DropdownMenuItem>Administrar contenido</DropdownMenuItem></Link>
                        <DropdownMenuSeparator />
                    </>
                }
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
