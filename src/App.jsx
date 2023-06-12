import React, { useContext, useEffect, useState } from "react";
import './App.css'

import { ThemeContext, UserContext } from "./main";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getCookie, setCookie } from "./scripts/cookie";
import { ADMIN } from "./store/usersReducer";
import AdminPannel from "./pages/AdminPannel";

const App = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    const users = useSelector(state => state.users.users)
    const products = useSelector(state => state.products.products)
    const { user, setUser } = useContext(UserContext)


    const isAuth = JSON.parse(localStorage.getItem('isAuth'))
    const userName = getCookie('userName')

    
    useEffect(() => {
        if (isAuth) {
            if (userName) {
                const userItem = users.map(user => {
                    if (user.name === userName) {
                        return user
                    }

                }).filter(user => user !== undefined)

                if (userItem) {
                    localStorage.setItem('isAuth', true)
                    localStorage.removeItem('cart')
                    setUser(userItem)

                }
            } else {
                localStorage.setItem('isAuth', false)
            }

        }
    }, [])

   
    const isAdmin = user.length > 0 && user[0].role.includes(ADMIN)
    return (
        <div className={`App-${theme}-theme`}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:productId" element={<SingleProduct />} />
                    {isAdmin && (
                        <Route path="/adminPannel" element={<AdminPannel />} />
                    )}
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;