export type ProductType = {
    id: number,
    slug: string;
    productName: string;
    description: string;
    active: boolean;
    isFeatured: boolean;
    taste: string;
    origin: {
        id:number;
        nameOrigin:string;
    }
    price: number;
    imagen: {
        id: number;
        name:string;
        url: string;
    };
    category: {
        data: {
            attributes: {
                slug: string;
                categoryName: string;
            }
        }
    }

}