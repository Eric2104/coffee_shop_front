'use client'

import { useGetFeaturedProduct } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Coffee, Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import ProductTasteOrigin from "./shared/product-taste-origin";

const FeatureProducts = () => {
    const { error, loading, result }: ResponseType = useGetFeaturedProduct()
    const router = useRouter()
    const { addItem, items } = useCart()

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>
            {(result !== null && result.length !== 0) ?
                (
                    <Carousel
                        opts={{
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {loading && (
                                <SkeletonSchema grid={3} />
                            )}
                            {result != null && (
                                result.map((product: ProductType) => {

                                    const { id, imagen, productName, slug, taste, origin } = product

                                    return (
                                        <CarouselItem key={`carousel-${id}`} className="md:basis-1/2 lg:basis-1/3 group">
                                            <div className="p-1">
                                                <Card className="py-3 border border-gray-200 shadow-none sm:min-h-80">
                                                    <CardContent className="relative flex items-center justify-center px-6 py-2 h-[27rem] md:h-[15rem]">
                                                        {imagen ?(
                                                            <img
                                                            src={`${imagen.url}`}
                                                            alt={`image-${productName}`}
                                                            className="object-cover w-full h-full" />
                                                        ):(
                                                            <img
                                                            src={`/imagenTemp.png`}
                                                            alt={`image-${productName}`}
                                                            className="object-cover w-full h-full" />
                                                        )}
                                                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                                            <div className="flex justify-center gap-x-6">
                                                                <IconButton
                                                                    onClick={() => router.push(`product/${slug}`)}
                                                                    icon={<Expand />}
                                                                    className="text-gray-600"
                                                                />
                                                                <IconButton
                                                                    onClick={() => addItem(product)}
                                                                    icon={<ShoppingCart />}
                                                                    className="text-gray-600"
                                                                />


                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                    <div className="flex justify-between gap-4 px-8">
                                                        <h3 className="text-lg font-bold line-clamp-2">{productName}</h3>
                                                        <ProductTasteOrigin productOrigin={origin.nameOrigin} productTaste={taste} />
                                                    </div>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    )
                                })
                            )}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext className="hidden sm:flex" />
                    </Carousel>
                )
                :
                (
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
                        <Coffee size={32} className="text-gray-600"/>
                        <p className="text-lg font-semibold text-gray-600">No hay productos destacados</p>
                    </div>
                )
            }
        </div>
    );
}

export default FeatureProducts;