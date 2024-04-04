import {configureStore} from '@reduxjs/toolkit'
import sliderReducer from '../Components/Features/Slices/SliderSlice'
import productsReducer from '../Components/Features/Slices/ProductsSlice'
import cartReducer from '../Components/Features/Slices/cartSlice'
export const Store=configureStore(
    {
        reducer:{
            slider:sliderReducer,
            products:productsReducer,
            cart:cartReducer
        }
    }
)
export default Store;
