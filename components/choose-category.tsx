'use client'
import { useGetCategories } from "@/api/getCategories";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const ChooseCategory = () => {
    const { error, loading, result }: ResponseType = useGetCategories()

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Elige tu categoría favorita</h3>

            {!loading && result !== null && result.length !== 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {result.map((category: CategoryType, index: number) => (
                        <React.Fragment key={`category-${category.categoryName}-${category.slug}`} >
                            <Link href={`/category/${category.slug}`}
                                className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg h-40">
                                <img src={`${category.imagen.url}`} alt="" className="w-72 transition duration-300 ease-in-out rounded-lg hover:scale-110 object-cover" />

                                <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">{category.categoryName}</p>
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            ) :
                (
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
                        <ShoppingBag size={32} className="text-gray-600" />
                        <p className="text-lg font-semibold text-gray-600">No hay productos destacados</p>
                    </div>
                )
            }
        </div>
    );
}

export default ChooseCategory;