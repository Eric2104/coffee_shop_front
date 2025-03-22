export function formatPrice(price: number) {
    const priceFormated = new Intl.NumberFormat('es-PA', {
        style: "currency",
        currency: "PAB"
    });

    const finalPrice = priceFormated.format(price);

    return finalPrice;
}
