import React, { useRef, useState } from "react";
import '../styles/AdminPannel.css'
import SingleProduct from "./SingleProduct";
import PannelProductItem from "../components/PannelProductItem";
import { useDispatch, useSelector } from "react-redux";
import { AddProductAction, deleteProductsAction } from "../store/productsReducer";
import MyButton from "../components/UI/MyButton/MyButton";
import MyModal from "../components/UI/ModalWindow/MyModal";
import MySelect from "../components/UI/MySelect/MySelect";
import { addItemToCart } from "../hooks/useCartItems";
import { ADMIN, USER, addUserAction, editUserAction } from "../store/usersReducer";
import PannelUserDisplay from "../components/PannelUserDisplay";




const CategoryProducts = () => {
    const products = useSelector(state => state.products.products)
    const dispath = useDispatch()
    const [newProductModal,setNewProductModal] = useState(false)


    const title = useRef()
    const description = useRef()
    const price = useRef()
    const image = useRef()
    const sale = useRef()
    const [gender,setGender] = useState('men')
    const category = useRef()

    function deleteItem(itemId) {
        dispath(deleteProductsAction(itemId))
    }
    function addItem() {
        const newTitle = title.current.value
        const newDescription = description.current.value
        const newPrice = price.current.value
        const newImage = image.current.value
        const newSale = sale.current.value
        const newGender = gender
        const newCategory = category.current.value

        if(newTitle && newDescription && newPrice && newImage && newSale && newGender && newCategory) {
            const arrayId = products.map(item => item.id).filter(item => !Number.isNaN(item))
            let maxId = Math.max(...arrayId)
            maxId += 1
            dispath(AddProductAction({
                title: newTitle,
                description: newDescription,
                price: newPrice,
                image: newImage,
                sale: newSale,
                id: maxId,
                filter: {
                    category: newCategory,
                    gender: newGender,
                },
            }))
            setNewProductModal(false)
        }

    }
    return (
      <div className="product__section-control">
        <MyButton onClick={() => setNewProductModal(true)}>ADD NEW PRODUCT</MyButton>
        <MyModal className='productAddModal' visible={newProductModal} setVisible={setNewProductModal} center={true}>
            <input ref={title} type="text" name="" id="" placeholder="TITLE"/>
            <input ref={description} type="text" placeholder="DESCRIPTION"/>
            <input ref={price} type="text" placeholder="PRICE IN DOLLARS"/>   
            <input ref={sale} type="text" placeholder="SALE"/>
            <input ref={category} type="text" placeholder="CATEGORY"/>
            <h2>Gender:</h2>
            <MySelect onChange={(info) => setGender(info)} options={[
                {
                    name: 'men',
                    value: 'men',
                },
                {
                    name: 'women',
                    value: 'women'
                }
            ]}/>
            <h2>Image</h2>
            <input ref={image} type="file" />
            <MyButton onClick={addItem}>Submit</MyButton>
        </MyModal>
           {products.map(item => 
            <PannelProductItem 
            func={deleteItem}
            key={item.id}
            price={item.price}
            title={item.title}
            description={item.description}
            image={item.image}
            sale={item.sale}
            id={item.id}
            gender={item.filter.gender}
            category={item.filter.category}
            />
            )}
      </div>
    );
};

const CategoryUsers = () => {
    const users = useSelector(state => state.users.users)
    const dispath = useDispatch()

    function editUser(name) {
        dispath(editUserAction(name, {role: [ADMIN,USER]} ))
    }
    return (
      <div className="UsersDisplay__block">
           {users.map((user, index) => <PannelUserDisplay func={editUser} key={index} name={user.name} role={user.role}/>)}
      </div>
    );
};


const AdminPannel = () => {

    const USERS = 'USERS'
    const PRODUCTS = 'PRODUCTS'
    const categorys = [USERS,PRODUCTS]
    const [activeCategory,setActiveCategory] = useState()

    let content;

    if(activeCategory === PRODUCTS) {
        content = <CategoryProducts />
    } 
    else if(activeCategory === USERS) {
        content = <CategoryUsers />
    }
    else {
        content = <div>Choose category</div>
    }
    return (
      <div className="AdminPannel__container">
          <div className="AdminPannel__categorys">

            {categorys.map((item, index) => 
                <div key={index} onClick={() => setActiveCategory(item)} className="AdminPannel__categorys-item">{item}</div>
            )}

          </div>
          <div className="AdminPannel__content">
                {content}
          </div>
      </div>
    );
};







export default AdminPannel;