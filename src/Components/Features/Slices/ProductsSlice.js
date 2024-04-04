import {createSlice} from '@reduxjs/toolkit'
import {storeData} from '../../../assets/data/dummyData'
const ProductsSlice=createSlice({
    name:'filtered products',
    initialState:{
        filteredProducts:JSON.parse(sessionStorage.getItem('filteredData')) || storeData,
        productCategories:['Hoodies','Dresses','Suits','Shoes','T-Shirts','Jeans','Jackets','Bags'],
        selectedProduct:'' || JSON.parse(sessionStorage.getItem('selecteditem'))
    },
    reducers:{
        typesOfProducts(state,action){
            const types=[...new Set(storeData.map((eachItem)=>eachItem.type))]
            state.productCategories=types;
        },
        filterProducts(state,action){
            
            try{
                const filter=storeData.filter((product)=>product.type===action.payload)
                state.filteredProducts=filter;
                console.log('filter',filter)
                sessionStorage.setItem('filteredData',JSON.stringify(filter))

            }
            catch(err){
                return err;
            }
            
        },
        viewSelectedProduct(state,action){
            try{
                console.log(action.payload)
                const filter=state.filteredProducts.filter((product)=>product.id===action.payload)
                state.selectedProduct=filter;
                sessionStorage.setItem('selecteditem',JSON.stringify(filter))
                console.log(state.selectedProduct)
            }
            catch(err){
                console.log(err)
            }
        }
    }
})

export const {filterProducts,productCategories,viewSelectedProduct}=ProductsSlice.actions;
export default ProductsSlice.reducer;