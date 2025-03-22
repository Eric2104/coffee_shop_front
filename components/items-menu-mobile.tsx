import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const ItemsMenuMobile = () => {
    return ( 
        <Popover>
            <PopoverTrigger>
                <p>Menu</p>
            </PopoverTrigger>
            <PopoverContent>
                <Link href={'/categories/cafe-molido'} className="block">Café molido</Link>
                <Link href={'/categories/cafe-grano'} className="block">Café grano</Link>
                <Link href={'/categories/cafe-capsula'} className="block">Café cápsula</Link>
            </PopoverContent>
        </Popover>
     );
}
 
export default ItemsMenuMobile;