import React, { useContext, useState } from "react";
import MyButton from "../components/UI/MyButton/MyButton";
import { ThemeContext } from "../main";
import MySlider from "../components/UI/MySlider/MySlider";
import { SliderData1 } from "../data/SliderData/SliderData1";
import { Link } from "react-router-dom";
import '../styles/Home.css'
import { setGenderToProductsPage } from "../scripts/setFilterToProductsPage";

const Home = () => {
    return (
      <>
      <MySlider text={'Shop now'} buttons={true} images={SliderData1} />
      <main>
        <div className="main__container">
          <section className="main__content_woman category__section">
            <Link onClick={() => setGenderToProductsPage('women')} to={'./products'}>WOMAN</Link>
          </section>
          <section className="main__content_man category__section">
            <Link onClick={() => setGenderToProductsPage('men')} to={'./products'}>MAN</Link>
          </section>
        </div>
      </main>
      </>
    );
};

export default Home;