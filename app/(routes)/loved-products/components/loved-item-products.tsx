import ProductImageMinuature from "@/components/shared/product-image-miniature";
import ProductTasteOrigin from "@/components/shared/product-taste-origin";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-product";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoveItemProductProps {
    product: ProductType
}

const LoveditemProduct = (props: LoveItemProductProps) => {

    const { product } = props
    const router = useRouter()
    const { removeLovedItem } = useLovedProducts()
    const { addItem } = useCart()

    const addToCheckout = ()=>{
        addItem(product)
        removeLovedItem(product.slug)
    }

    return (
        <li className="flex p-6 border-b">
            {product.imagen ? (
                <ProductImageMinuature slug={product.slug} url={product.imagen.url}/>)
            :(
                <ProductImageMinuature slug={product.slug} url={"/imagenTemp.png"}/>
            )}
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <div >
                        <h2 className="text-lg font-bold">{product.productName}</h2>
                        <p className="font-bold">{formatPrice(product.price)}</p>
                        <ProductTasteOrigin productTaste={product.taste} productOrigin={product.origin.nameOrigin}/>
                    </div>
                    <Button className="mt-5 rounded-full" onClick={()=>addToCheckout()}>Añadir al carrito</Button>
                </div>
                <div>
                    <button className={cn('rounded-full flex item justify-center bg-white border shadow-md p-1 hover:scale-110 transition')}>
                        <X size={20} onClick={() => removeLovedItem(product.slug)} />
                    </button>
                </div>
            </div>
        </li>
    );
}

export default LoveditemProduct;