export function getSaledPrice(sale,price) {
    if(sale !== 0) {
        return Math.round(price - (price * (sale / 100)))
    }
}