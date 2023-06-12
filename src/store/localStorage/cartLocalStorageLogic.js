
// export function setCartItem(product) {
//     const cartProducts = JSON.parse(localStorage.getItem('cart'));


//     if (cartProducts === null || cartProducts === undefined) {
//         product.amount = 1
//         localStorage.removeItem('cart')
//         localStorage.setItem('cart', JSON.stringify([product]));
//     } else {

//         if (cartProducts.filter(item => item.id === product.id).length > 0) {
//             const index = cartProducts.findIndex(item => item.id === product.id)

//             if (product.amount) {
//                 product.amount += 1
//             } else {
//                 product.amount = 1
//             }

//             cartProducts[index] = product
//         }
//         else {

//             cartProducts.push(product);
//         }

//         localStorage.setItem('cart', JSON.stringify(cartProducts));
//     }

// }