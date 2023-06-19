import React, { useContext, useEffect, useRef, useState } from "react";
import MyButton from "../components/UI/MyButton/MyButton";
import { ThemeContext } from "../main";
import MySlider from "../components/UI/MySlider/MySlider";
import { SliderData1 } from "../data/SliderData/SliderData1";
import { Link } from "react-router-dom";
import '../styles/Home.css'
import { setGenderToProductsPage } from "../scripts/setFilterToProductsPage";
import { useElementOnScreen } from "../hooks/useElementOnScreen";

const Home = () => {
    const [sliderRef, isSliderVisible] = useElementOnScreen()
    const [womanRef, isWomanVisible] = useElementOnScreen()
    const [manRef, isManVisible] = useElementOnScreen()
    return (
      <>
      <MySlider ref={sliderRef}  className={`HomeMain-slider ${isSliderVisible && 'animationAppearanceFromThisPlace'}`}
       text={'Shop now'} buttons={true} images={SliderData1} />
      <main>
        <div className="main__container">
          <section ref={womanRef}  className={`main__content_woman category__section ${isWomanVisible && 'animationAppearanceFromLeft'}`}>
            <Link onClick={() => { setGenderToProductsPage('women'); window.scrollTo(0,0)}} to={'./products'}>WOMAN</Link>
          </section>
          <section ref={manRef}  className={`main__content_man category__section ${isManVisible && 'animationAppearanceFromRight'}`}>
            <Link onClick={() => { setGenderToProductsPage('men'); window.scrollTo(0,0)}} to={'./products'}>MAN</Link>
          </section>
        </div>
      </main>
      </>
    );
};

export default Home;