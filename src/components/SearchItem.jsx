import React, { useState } from "react";
import '../styles/SearchItem.css'
import { Link } from "react-router-dom";
import { setCurrencyText } from "../scripts/setCurrencyText";
import { getSaledPrice } from "../scripts/sale";

const SearchItem = ({title,price,image,id,setModal,sale}) => {

    const saledPrice = getSaledPrice(sale,price)
    function modalOff() {
        setModal(false)
    }
    const priceSymbol = setCurrencyText()
    return (
      <Link onClick={modalOff} to={`/products/${id}`} className="searchItem__content">
        <img src={image} alt="" />
        <div className="searchItem__content-info">
           <h2>{title}</h2>
           {sale !== 0 ? (
            <h3>{saledPrice} {priceSymbol} <span className="saledPrice">{price} {priceSymbol}</span></h3>
            ) : (
              <h3>{price} {priceSymbol}</h3>
            )}
        </div>
      </Link>
    );
};

export default SearchItem;