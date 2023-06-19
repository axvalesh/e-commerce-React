import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyButton from "../components/UI/MyButton/MyButton";
import '../styles/SingleProduct.css'
import { addItemToCart } from "../hooks/useCartItems";
import { CurrencyContext } from "../main";
import { setCurrencyText } from "../scripts/setCurrencyText";
import { checkIsAuth } from "../scripts/checkIsAuth";
import { getSaledPrice } from "../scripts/sale";




const SingleProduct = () => {
    const id = useParams().productId
    const productsData = useSelector(state => state.products).products.filter(product => product.id == id)
    const product = productsData[0]
    const isAuth = checkIsAuth()
    const [amount,setAmount] = useState(1)

    const priceSymbol = setCurrencyText()
    const saledPrice = getSaledPrice(product.sale,product.price)
    
    return (
        <div className="singleProduct__content">
            <div className="singleProduct__container">

                <div className="singleProduct__content_side-images animationAppearanceFromLeft">
                    <div className="side-image-test"></div>
                    <div className="side-image-test"></div>
                    <div className="side-image-test"></div>
                    <div className="side-image-test"></div>
                </div>
                <div className="singleProduct__content_main-image animationAppearanceFromThisPlace">
                    <img src={product.image} alt="" />
                </div>
                <div className="singleProduct__content_info animationAppearanceFromRight">
                    <h2>{product.title}</h2>
                    <h3>{product.description}</h3>
                    {product.sale !== 0 ?(
                        <p>{saledPrice} {priceSymbol} <span className="saledPrice">{product.price} {priceSymbol}</span></p>
                    ) :(
                        <p>{product.price} {priceSymbol}</p>
                    )}
                    <div className="info__cart_activities ">
                        <span>Quantity:</span>
                        <span className="plus-minus-border">
                            <span onClick={() => setAmount(amount - 1)} className="icon-minus"></span>
                            <span>{amount}</span>
                            <span onClick={() => setAmount(amount + 1)} className="icon-plus"></span>
                        </span>
                        <MyButton onClick={(event) => isAuth 
                            ? addItemToCart({...product, amount: amount, price: saledPrice}) 
                            : event.target.classList.add('notIsAuth')} >Add to cart</MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;