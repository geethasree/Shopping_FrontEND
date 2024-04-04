import React,{useState,useEffect} from 'react'
import './style.css'
import { useDispatch,useSelector } from 'react-redux';
import { filterProducts } from '../Features/Slices/ProductsSlice';
import {NavLink} from 'react-router-dom'
import axios from 'axios';

const NavigateButtons = () => {
    
  const dispatch=useDispatch()
  
  const buttons=useSelector((data)=>data.products.productCategories)

  const [categoriesList,setCategoriesList]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001/categories').then((res)=>{
      setCategoriesList(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <>
        <div className='flex-box'>
            {
               categoriesList && categoriesList.map((eachButton,id)=>
                    <NavLink key={id} to={`/filteredProducts/`+eachButton.category_name}><button className='navigatebutton' onClick={()=>dispatch(filterProducts(eachButton.category_name))}>{eachButton.category_name.toUpperCase()}</button></NavLink>
                )
            }
        </div>
        
    </>
  )
}


export default NavigateButtons