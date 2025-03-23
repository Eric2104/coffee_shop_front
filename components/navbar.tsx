'use client'
import { useEffect, useState } from 'react';
import { Heart, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import MenuList from "./menu-list";
import ToggleThemes from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-product";
import { MenuSession } from "./menuSession";
import { OptionsMenuUser } from "./options-menu-user";
import { AppSidebar } from "./app-side-bar";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken: any = jwtDecode(storedToken);
            const currentTime = Date.now() / 1000; // Tiempo actual en segundos
            if (decodedToken.exp > currentTime) {
                setToken(storedToken);
            } else {
                localStorage.removeItem('token');
            }
        }
    }, []);

    const cart = useCart();
    const { lovedItems } = useLovedProducts();

    return (
        <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
            <div className="flex items-center gap-2">
                <div className="lg:hidden">
                    <AppSidebar />
                </div>

                <h1 className="text-xl md:text-3xl">
                    Coffee
                    <Link href="/">
                        <span className="font-bold">Shop</span>
                    </Link>
                </h1>
            </div>
            <div className="items-center justify-between hidden lg:block">
                <MenuList />
            </div>
            <div className="flex items-center justify-between gap-2 sm:gap-7">
                <Link href={'/cart'} className="flex gap-1">
                    <ShoppingCart strokeWidth={'1'} className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-sm lg:text-base">{cart.items.length}</span>
                </Link>
                <Link href={'/loved-products'} className={`flex gap-1 `}>
                    <Heart strokeWidth={'1'} className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${lovedItems.length > 0 && 'fill-black dark:fill-white'}`} />
                    <span className="text-sm lg:text-base">{lovedItems.length}</span>
                </Link>

                {!token ?
                    <MenuSession />
                    :
                    <OptionsMenuUser />
                }

                {/* <ToggleThemes /> */}
            </div>
        </div>
    );
}

export default NavBar;