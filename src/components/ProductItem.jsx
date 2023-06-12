import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setCurrencyText } from '../scripts/setCurrencyText'
import { getSaledPrice } from "../scripts/sale";


const ProductItem = ({image,name,price,id,sale}) => {

    const saledPrice = getSaledPrice(sale,price)

    const priceSymbol = setCurrencyText()
    return (
      <div className="product__item">
        <img src={image} alt="" />
        <h2>{name}</h2>
        {sale !== 0 ? (
          <h3>{saledPrice} {priceSymbol} <span className="saledPrice">{price} {priceSymbol}</span></h3>
        ) : (
          <h3>{price} {priceSymbol}</h3>  
        )}
        <Link to={`/products/${id}`} className='product__item_hover-button'>View</Link>
      </div>
    );
};

export default ProductItem;