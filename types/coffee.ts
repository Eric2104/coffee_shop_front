export type CoffeeType = {
    id: number;
    slug: string;
    productName: string;
    description: string;
    active: boolean;
    taste: string;
    featured: boolean;
    price: number;
    origin: {
        id: number;
        nameOrigin: string;
    };
    category: {
        slug: string;
        categoryName: string;
        imagen: {
            id: number;
            url: string;
            name: string;
        };
    };
    imagen: {
        id: number;
        url: string;
        name: string;
    };
}