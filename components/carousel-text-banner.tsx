'use client'
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay"

export const dataCarouselTop = [
    {
        id: 1,
        title: 'Envios 24/7',
        description: 'Disfruta de envíos VIP en 24/48 horas. ¡Recibe tus productos rápidamente!',
        link: '#'
    },
    {
        id: 2,
        title: 'Hasta -25% en compras >$40',
        description: 'Aprovecha hasta un 25% de descuento en compras superiores a $40. ¡No te lo pierdas!',
        link: '#'
    },
    {
        id: 3,
        title: 'Devoluciones y entregas gratis',
        description: 'Devoluciones y envíos gratuitos para que compres con total tranquilidad.',
        link: '#'
    },
    {
        id: 4,
        title: 'Protección en envíos',
        description: 'Todos nuestros envíos cuentan con protección asegurada para tu tranquilidad.',
        link: '#'
    }
]


const CarouselTextbanner = () => {
    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel className="w-full max-4xl mx-auto" plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
            >
                <CarouselContent>
                    {dataCarouselTop.map(({ id, title, link, description }) => (
                        <CarouselItem key={id} className="cursor-pointer">
                            <Link href={`/${link}`} key={id} >
                                <div>
                                    <Card className="shadow-none border-none bg-transparent">
                                        <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                                            <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                                            <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default CarouselTextbanner;