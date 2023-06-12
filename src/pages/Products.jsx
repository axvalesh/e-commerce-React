import React, { useContext, useEffect, useMemo, useState } from "react";
import MySelect from "../components/UI/MySelect/MySelect";
import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";
import '../styles/Products.css'


const Products = () => {
    const productsData = useSelector(state => state.products)
    const products = productsData.products

    

    const [sort, setSort] = useState('all')
    const [gender, setGender] = useState(null)


    const [countToShow, setCountToShow] = useState(8)
    const [currentPage, setCurrentPage] = useState(1)
    let filteredProducts = products


    const selectedGender = JSON.parse(localStorage.getItem('gender'))

    if(selectedGender) {
        setGender(selectedGender)
        localStorage.removeItem('gender')
    }
    

    // const productsToShow = useMemo(() => {
    //     return products.slice(countToShow * currentPage - countToShow,countToShow * currentPage)
    // },[currentPage])

    // const setGenderFunction = useMemo(() => {
    //     console.log(productsToShow);
    //     if(gender !== null) {
    //         return productsToShow.filter(product => {
    //             return product.filter.gender === gender
    //         })
    //     } else {
    //         return productsToShow
    //     }
    // },[gender,currentPage])

    // const filteredProducts = useMemo(() => {
    //     if (sort !== 'all') {
    //         return setGenderFunction.filter(product => {
    //             return product.filter.category === sort
    //         })
    //     } else {
    //         return setGenderFunction
    //     }
    // }, [sort,gender,currentPage])

   



    if (gender !== null) {
        filteredProducts = filteredProducts.filter(product => product.filter.gender === gender)
    }

    if (sort !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.filter.category === sort)
    }

    const productToShow = () => {
        if (currentPage > totalPages || currentPage < 0) {
            setCurrentPage(totalPages)
            return filteredProducts.slice(
                countToShow * currentPage - countToShow,
                countToShow * currentPage
            )
        } else {
            return filteredProducts.slice(
                countToShow * currentPage - countToShow,
                countToShow * currentPage
            )
        }
    }
    let totalPages = Math.ceil(filteredProducts.length / countToShow)
    let dislpayProducts = productToShow()
    return (
        <section className="products__container">
            <div className="products__section__categorys">
                <h2>Product category</h2>
                <div className="categorys">
                    <div onClick={() => setGender('men')} className={`category ${gender === 'men' && 'active'}`}>Men</div>
                    <div onClick={() => setGender('women')} className={`category ${gender === 'women' && 'active'}`}>Women</div>
                </div>
            </div>
            <div className="products__section_content">
                <div className="products__content__settings">
                    <div>
                        <MySelect
                            options={useMemo(() => productsData.categorys.map(item => ({ name: item, value: item })), [products])}
                            defaultValue={'all'}
                            onChange={(info) => setSort(info)}
                        />
                        <MySelect
                        onChange={(info) => {
                            if(info === 'all') {
                                setCountToShow(8)
                            } else {
                                setCountToShow(Number(info))
                            }
                        }}
                            options={[
                                {
                                    name: 'Show 20',
                                    value: '20'
                                },
                            ]}
                            defaultValue={'Show 8'}
                        />
                    </div>
                    <div className="displayFlexCenterY">
                        <input value={currentPage} onChange={event => setCurrentPage(event.target.value)} className="count-pages" type="number" />
                        of  {totalPages}
                        <div onClick={() => setCurrentPage(currentPage + 1)} className="icon-chevrons-right"></div>
                    </div>
                </div>
                <div className="products__content__all">
                    {
                        dislpayProducts.length !== 0
                            ?
                            dislpayProducts.map((item, index) =>
                                <ProductItem sale={item.sale} id={item.id} name={item.title} image={item.image} price={item.price} key={index} index={index + 1} />
                            )
                            :
                            <h2>Sorry,there in not products</h2>
                    }
                </div>
            </div>
        </section>
    );
};

export default Products;