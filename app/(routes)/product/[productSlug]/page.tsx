'use client'

import getProductBySlug from "@/api/getProductBySlug";
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/skeletonProduct";
import CarouselProduct from "./components/carousel-product";
import { ResponseType } from "@/types/response";
import InfoProduct from "./components/info-product";

export default function Page() {
    const params = useParams()
    const { productSlug } = params

    const { error, loading, result }: ResponseType = getProductBySlug(productSlug)

    if (result === null) {
        return (<SkeletonProduct />)
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24 lg:min-h-[80vh]">
            <div className="grid sm:grid-cols-2">
                <div>
                    {result[0].imagen ?
                        <CarouselProduct imagen={result[0].imagen} />
                        :
                        <div className="relative w-[30rem] h-[15rem] overflow-hidden">
                            <img src="/imagenTemp.png" alt="NomagenFile" className="object-contain w-full h-full" />
                            <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20 font-bold text-neutral-600 drop-shadow-lg">Imagen no disponible</p>
                        </div>
                    }
                </div>

                <div className="sm:px-12">
                    <InfoProduct product={result[0]} />
                </div>
            </div>
        </div>
    )
}