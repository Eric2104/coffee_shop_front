'use client'
import { useLovedProducts } from "@/hooks/use-loved-product"
import LoveditemProduct from "./components/loved-item-products"


export default function Page() {

    const {lovedItems}=useLovedProducts()

  return(
    <div className="max-w-4xl py-4 mx-auto sm:py-32 px-4">
        <h1 className="sm:text-2xl">Productos que te gustan</h1>
        <div>
            <div>
                {lovedItems.length ===0&&(
                    <p>No hay productos en la lista de me gusta.</p>
                )}
                <ul>
                    {lovedItems.map((item)=>(
                        <LoveditemProduct key={item.id} product={item}/>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}