

export function getCartItems() {
    const savedCart = JSON.parse(localStorage.getItem('cart'))
    if(savedCart) {
        return savedCart
    }
    return []
}

export function addItemToCart(item) {
    const savedCart = JSON.parse(localStorage.getItem('cart'))

    if(savedCart) {
        const isItemExist = savedCart.some(element => element.id === item.id)
        if(isItemExist) {
            const updatedCart = savedCart.map(element => {
                if(element.id === item.id) {
                    if(item.amount <= 1) {
                        element.amount += 1
                    } else {
                    element.amount += item.amount
                    }
                }
                return element
            })
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        } else {
            item.amount = 1
            savedCart.push(item)
            localStorage.setItem('cart', JSON.stringify(savedCart))
        }


    } else {
        if(!item.amount) {
            item.amount = 1
        }
        localStorage.setItem('cart', JSON.stringify([item]))
    }
}

export function removeItemFromCart(item) {
    const savedCart = JSON.parse(localStorage.getItem('cart'))

    if(savedCart) {
        const itemIndex = savedCart.findIndex((cartItem) => cartItem.id === item.id);
        if(itemIndex !== -1) {
            if(item.amount > 1) {
                const updatedCart = savedCart.map(element => {
                    if(element.id === item.id) {
                        element.amount -= 1
                    }
                    return element
                })
                localStorage.setItem('cart', JSON.stringify(updatedCart))
            } else {
                savedCart.splice(itemIndex, 1)
                localStorage.setItem('cart', JSON.stringify(savedCart))
            }
        } 
    }
}



//this code doesnt work properly 
// export const useCartItem = (item) => {
//     const [cartItems, setCartItems] = useState([]);
//     console.log(...cartItems);
//     useEffect(() => {
//         const savedCart = localStorage.getItem('cart');
//         if (savedCart) {
//             setCartItems(JSON.parse(savedCart));
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//     }, [cartItems]);


//     const addToCart = () => {
//         const itemExists = cartItems.some((cartItem) => cartItem.id === item.id);
//         if (itemExists) {
//             console.log('+');
//             const updatedCart = cartItems.map((cartItem) => {
//                 if (cartItem.id === item.id) {
//                     return { ...cartItem, amount: cartItem.amount += 1 };
//                 }
//                 return cartItem;
//             });
//             setCartItems(updatedCart);
//         } else {
//             setCartItems((prevItems) => prevItems ? [...prevItems, { ...item, amount: 1 }] : [{ ...item, amount: 1 }]);
//         }
//     };

//     const removeFromCart = () => {
//         const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

//         if (itemIndex !== -1) {
//             if (cartItems[itemIndex].amount > 1) {
//                 const updatedCart = [...cartItems];
//                 updatedCart[itemIndex].amount -= 1;
//                 setCartItems(updatedCart);
//             } else {
//                 const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
//                 setCartItems(updatedCart);
//             }
//         }
//     };



//     return { addToCart, removeFromCart, };
// };