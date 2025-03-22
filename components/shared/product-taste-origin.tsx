
interface ProductTasteOriginProps{
    productTaste:string,
    productOrigin: string
}

const ProductTasteOrigin = (props:ProductTasteOriginProps) => {

    const {productOrigin,productTaste}=props
   
    return (
        <div className="flex items-center justify-between gap-3">
            <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                {productTaste}
            </p>
            <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit">
                {productOrigin}
            </p>
        </div>
    );
}

export default ProductTasteOrigin;