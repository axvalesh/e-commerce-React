import sneakersM from '../assets/images/sneakers-m.jpg'
import sneakersW from '../assets/images/sneakers-w.jpg'
import jacketM from '../assets/images/j-man.jpg'
import jacketW from '../assets/images/j-woman.jpg'
import tshirtM from '../assets/images/t-man.jpg'
import tshirtW from '../assets/images/t-woman.jpg'

const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const EDIT_PRODUCTS = 'EDIT_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

const initProducts = {
    categorys: ['boots','jackets','T-shirt'],
    products: [
        {
            id: 1,
            title: 'boots nice',
            price: 400,
            description: 'a shoe with a rubber sole that is designed for people to wear while running, playing sports, etc.',
            sale: 70,
            image: sneakersM,
            filter: {
                category: 'boots',
                gender: 'men',
            }
        },
        {
            id: 2,
            title: 'jackets fine',
            price: 300,
            description: 'an outer garment extending either to the waist or the hips, typically having sleeves and a fastening down the front',
            sale: 0,
            image: jacketM,
            filter: {
                category: 'jackets',
                gender: 'men',
            }
        },
        {
            id: 3,
            title: 'T-shirt nice',
            price: 400,
            description: 'a shoe with a rubber sole that is designed for people to wear while running, playing sports, etc.',
            sale: 70,
            image: tshirtM,
            filter: {
                category: 'T-shirt',
                gender: 'men',
            }
        },
        {
            id: 4,
            title: 'boots fine',
            price: 400,
            description: 'a shoe with a rubber sole that is designed for people to wear while running, playing sports, etc.',
            sale: 30,
            image: sneakersW,
            filter: {
                category: 'boots',
                gender: 'women',
            }
        },
        {
            id: 5,
            title: 'jackets nice',
            price: 300,
            description: 'an outer garment extending either to the waist or the hips, typically having sleeves and a fastening down the front',
            sale: 0,
            image: jacketW,
            filter: {
                category: 'jackets',
                gender: 'women',
            }
        },
        {
            id: 6,
            title: 'T-shirt fine',
            price: 400,
            description: 'a shoe with a rubber sole that is designed for people to wear while running, playing sports, etc.',
            sale: 70,
            image: tshirtW,
            filter: {
                category: 'T-shirt',
                gender: 'women',
            }
        },
        {
            id: 7,
            title: 'T-shirt fine',
            price: 700,
            description: 'a shoe with a rubber sole that is designed for people to wear while running, playing sports, etc.',
            sale: 70,
            image: tshirtW,
            filter: {
                category: 'jackets',
                gender: 'women',
            }
        },
      
        
        
        
    ]
}



export const productsReducer = (state=initProducts ,action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {...state, products: [...state.products, action.payload]}
        case GET_PRODUCTS:
            return state
        case EDIT_PRODUCTS:
            return {...state, products: action.payload }
        case DELETE_PRODUCT:
            const updatedProducts = state.products.filter(product => product.id !== action.payload)
            return { ...state, products: updatedProducts }
        default:
            return state
    }
}


export const AddProductAction = (payload) => ({type: ADD_PRODUCT, payload})
export const getProductsAction = () => ({type: GET_PRODUCTS})
export const editProductsAction = (payload) => ({type: EDIT_PRODUCTS, payload})
export const deleteProductsAction = (payload) => ({type: DELETE_PRODUCT, payload})