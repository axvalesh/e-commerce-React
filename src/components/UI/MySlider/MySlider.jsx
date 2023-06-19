import React, { forwardRef, useEffect, useState } from "react";
import classes from './MySlider.module.css'
import MyButton from "../MyButton/MyButton";
import { Link } from "react-router-dom";
const MySlider = forwardRef(({className,images, buttons=false, text}, ref) => {
    const [current,setCurrent] = useState(0)
    const length = images.length

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(current < length - 1) {
                setCurrent(current + 1)
            } else {
                setCurrent(0)
            }
        },5000)

        return () => {
            clearInterval(intervalId)
        };
    },[length,current])

    return (
      <section ref={ref} className={`${classes.slider} ${className}`}>
        {buttons && (
            <>
            <span onClick={() => setCurrent(current !== 0 ? current - 1 : length - 1)} className={classes.spanLeft}>
                <div className={`icon-chevrons-left`}></div>
            </span>    
            <span onClick={() => setCurrent(current < length -1 ? current + 1 : 0)} className={classes.spanRight}>
                <div className={`icon-chevrons-right`}></div>
            </span>
            </>

        )}

        {text && (
            <span className={classes.textBlock}>
                <Link to={'/products'}>{text}</Link>
            </span>
        )}

        {images.map((image,index) => 
            <img
            className={index === current ? classes.imgActive : classes.img}
            src={image.image}
            alt=""
            key={index}
            />
        
        )}

      </section>
    );
});

export default MySlider;