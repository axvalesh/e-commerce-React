import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext, CurrencyContext, ThemeContext } from "../main";
import MyButton from "./UI/MyButton/MyButton";
import { Link } from "react-router-dom";
import MyModal from "./UI/ModalWindow/MyModal";
import CartItem from "./CartItem";
import { getCartItems } from "../hooks/useCartItems";
import '../styles/Header.css'
import { useDispatch, useSelector } from "react-redux";
import SearchItem from "./SearchItem";
import { editProductsAction } from "../store/productsReducer";
import MySelect from "./UI/MySelect/MySelect";
import LoginForm from "./LoginForm";
import { ADMIN } from "../store/usersReducer";
import { setCurrencyText } from "../scripts/setCurrencyText";


const Header = () => {
    //context
    const { theme, setTheme } = useContext(ThemeContext)
    const { currency, setCurrency } = useContext(CurrencyContext)

    const dispath = useDispatch()

    //modalWindow
    const [modal, setModal] = useState(false)
    const [searhModal, setSearchModal] = useState(false)
    const [userModal, setUserModal] = useState(false)


    //search
    const [search, setSearch] = useState('')
    const [searchOutput, setSearchOutput] = useState([])
    const productsData = useSelector(state => state.products)
    const products = productsData.products

    //cart
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0)
    const priceSymbol = setCurrencyText()

    //user
    const { user, setUser } = useContext(UserContext)



    //forResponsive
    const links = useRef()


    useEffect(() => {
        const totalPrice = items.reduce((acc, item) => acc + (item.price * item.amount), 0)
        setTotal(totalPrice)
    }, [items])

    useEffect(() => {
        setItems(getCartItems());
    }, [modal])

    useEffect(() => {
        setItems(getCartItems());
    }, []);

    useEffect(() => {
        if (search) {
            console.log(validSearch(search));
            const timeOut = setTimeout(() => setSearchOutput(validSearch(search)), 500)
            return () => clearTimeout(timeOut)
        }
    }, [search])

    useEffect(() => {
        if (currency !== 'USD') {
            if (currency === 'EUR') {
                const changeCurrencyProducts = products.map(item => ({ ...item, USDprice: item.price, price: Math.round(item.price * 0.93) }))
                dispath(editProductsAction(changeCurrencyProducts))
                const changeCurrencyCartItems = items.map(item => ({ ...item, USDprice: item.price, price: Math.round(item.price * 0.93) }))
                localStorage.setItem('cart', JSON.stringify(changeCurrencyCartItems))
            }
        }
        else {
            if (products[0].USDprice) {
                const changeCurrencyProducts = products.map(item => ({ ...item, price: item.USDprice }))
                dispath(editProductsAction(changeCurrencyProducts))
                const changeCurrencyCartItems = items.map(item => ({ ...item, price: item.USDprice }))
                localStorage.setItem('cart', JSON.stringify(changeCurrencyCartItems))
            }
        }
    }, [currency])


    
    function changeTheme() {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    const validSearch = (word) => {
        return products.filter(product => product.title.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
    }
    return (
        <>
            <div className="header_settings__block">
                <MyButton onClick={changeTheme}>
                    {theme === 'light' ? 'dark' : 'light'}
                </MyButton>

                <MySelect
                    onChange={info => {
                        if (info === 'all') {
                            setCurrency('USD')
                        } else {
                            setCurrency(info)
                        }
                    }}
                    defaultValue={'USD'} options={[{ name: 'EUR', value: 'EUR' }]} />
            </div>
            <header>
                <div className="header__content">
                    <Link to='/' className="header__content__logo">MyShop</Link>

                    <nav ref={links} className="header__content__navbar">
                        <Link to='/'>Home</Link>
                        <Link to='/products'>Products</Link>
                    </nav>

                    <div className='header__content__activities'>

                        <div onClick={() => setSearchModal(true)} className="icon-search"></div>

                        <MyModal visible={searhModal} setVisible={setSearchModal}>
                            <div className="search__bar-wrapper">
                                <input value={search} onChange={event => setSearch(event.target.value)} type="text" className="search__bar" name="seacrh-bar" />
                                <label htmlFor="seacrh" className="icon-search"></label>
                            </div>
                            {searchOutput.map(item =>
                                <SearchItem
                                    sale={item.sale}
                                    setModal={setSearchModal}
                                    title={item.title}
                                    price={item.price}
                                    image={item.image}
                                    id={item.id}
                                />)}
                        </MyModal>
                        { }
                        <div onClick={() => setModal(true)} className="icon-cart"></div>
                        <MyModal visible={modal} setVisible={setModal}>
                            {user[0] !== undefined ? (
                                <>
                                    {items.length > 0 ?
                                        <>
                                            {items.map((item, index) =>
                                                <CartItem priceSymbol={priceSymbol} setItems={setItems} item={item} amount={item.amount} key={index} title={item.title} price={item.price} description={item.description} image={item.image} />
                                            )}
                                            <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Total: {total} {priceSymbol}</h2>
                                        </>
                                        :
                                        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>there is no elements</h2>
                                    }
                                </>
                            )
                        : (
                            <h2>Sorry,but you have to login for cart</h2>
                        )}
                        </MyModal>

                        {user[0] !== undefined ? (
                            <>
                                <MyButton onClick={() => { localStorage.setItem('isAuth', false); setUser([]) }}>Logout</MyButton>
                            </>
                        ) : (
                            <>
                                <div onClick={() => setUserModal(true)} className="icon-user"></div>
                                <MyModal visible={userModal} setVisible={setUserModal} center={true}>
                                    <LoginForm setModal={setUserModal} />
                                </MyModal>
                            </>

                        )}

                        {user[0] !== undefined && user[0].role.includes(ADMIN) && (
                            <Link to={'/adminPannel'}>ADMIN PANNEL</Link>
                        )}
                        <span onClick={() => links.current.classList.toggle('active')} className="icon-menu"></span>
                    </div>

                </div>
            </header>
        </>
    );
};

export default Header;