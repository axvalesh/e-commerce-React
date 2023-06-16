import React, { useEffect, useState } from "react";
import '../styles/Cartitem.css'
import { addItemToCart, getCartItems, removeItemFromCart } from "../hooks/useCartItems";
import { setCurrencyText } from "../scripts/setCurrencyText";



const CartItem = ({amount, image, title, description, price, item,setItems,priceSymbol }) => {

    
    
    const addToCart = () => {
        addItemToCart({...item,amount: 1})
        setItems(getCartItems());
    }
    const removeFromCartItem = () => {
        removeItemFromCart(item)
        setItems(getCartItems());
    }
    return (
        <div className="cartItem__content">
            <div className="image__wrapper">
                <img src={image} alt="" />
            </div>
            <div className="cartItem__content-info">
                <h2>Title: {title}</h2>
                <h3>Description: {description}</h3>
                <p>Price: {price} {priceSymbol}</p>
                <div className="info__cart_activities">
                        <span>Quantity:</span>
                        <span className="plus-minus-border">
                            <span onClick={removeFromCartItem} className="icon-minus"></span>
                            <span>{amount}</span>
                            <span onClick={addToCart} className="icon-plus"></span>
                        </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;