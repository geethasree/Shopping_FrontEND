import React from 'react'
import './style.css'
import { useDispatch,useSelector } from 'react-redux';
import { filterProducts } from '../Features/Slices/ProductsSlice';
import {NavLink} from 'react-router-dom'
const NavigateButtons = () => {
    
  const dispatch=useDispatch()
  
  const buttons=useSelector((data)=>data.products.productCategories)
  return (
    <>
        <div className='flex-box'>
            {
                buttons.map((eachButton)=>
                    <NavLink to={`/filteredProducts/`+eachButton}><button className='navigatebutton' onClick={()=>dispatch(filterProducts(eachButton))}>{eachButton.toUpperCase()}</button></NavLink>
                )
            }
        </div>
        
    </>
  )
}


export default NavigateButtons