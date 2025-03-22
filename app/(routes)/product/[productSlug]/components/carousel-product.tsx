import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface CarouselProductProps {
  imagen: {
    id: number;
    url: string;
  };
}

const CarouselProduct = (props: CarouselProductProps) => {
  const { imagen } = props;

  return (
    <div className="sm:px-16 py-4">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
              <img
                src={`${imagen.url}`}
                alt={`Image_product-`}
                className="rounded-lg mx-auto"
              />
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselProduct;