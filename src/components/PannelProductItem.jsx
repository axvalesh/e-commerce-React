import React, { useState } from "react";
import '../styles/PannelProductItem.css'
import MyButton from "./UI/MyButton/MyButton";
import { getSaledPrice } from "../scripts/sale";
import { setCurrencyText } from "../scripts/setCurrencyText";


const PannelProductItem = ({title,price,description,sale,image,gender,category,id,func}) => {

  const priceSymbol = setCurrencyText()
  const saledPrice = getSaledPrice(sale,price)
    return (
      <div className="PannelProductItem__content">
           <div>
           <img src={image} alt="" />
           </div>
            <div className="PannelProductItem__info">
                <h2>Title: {title}</h2>
                <h3>Description: {description}</h3>
                <p>Price: {price} {priceSymbol}</p>
                <p>Sale: {sale}</p>
                {sale !== 0 && (
                   <h3>{saledPrice} {priceSymbol} <span className="saledPrice">{price} {priceSymbol}</span></h3>
                )}
                <p>Id: {id}</p>
                <p>Category: {category}</p>
                <p>Gender: {gender}</p>
                <MyButton onClick={() => func(id)}>Delete product</MyButton>
            </div>
      </div>
    );
};

export default PannelProductItem;