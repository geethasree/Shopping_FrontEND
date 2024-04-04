import React from 'react'
import { useParams,NavLink } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { viewSelectedProduct } from '../Features/Slices/ProductsSlice'
import { Navbar } from '../Navbar/Navbar'
import './style.css'
const FilteredProducts = () => {
  const products=useSelector((product)=>product.products.filteredProducts)
  const dispatch=useDispatch()
  const {type}=useParams()
  console.log('Looking for ',products,'and',type)
  return (
    <>
    <Navbar />
    <div className='flex-containerfilter'>
      <p>Looking for <span>{type}</span></p>
      <div className='flexfilter'>
        {
          products.map((eachProduct)=>
          <NavLink to={'/filteredProducts/'+type+'/'+eachProduct.id} className='flex-itemfilter'  onClick={()=>dispatch(viewSelectedProduct(eachProduct.id))}>

                <div className="imagediv">
                  <img src={eachProduct.img} />
                </div>
                <p className='productname'><b>{eachProduct.name}</b></p>
                <p>{eachProduct.text}</p>
                <div className='priceandcolors'>
                  <p className='productprice'>Rs {eachProduct.price}/-</p>
                  {
                    eachProduct.color.map((color)=><span style={{'backgroundColor':color}} className='colorsavailable'></span>)
                  }
                  
                </div>
                
            
          </NavLink>
          )
        }
      </div>
    </div>
    </>
  )
}

export default FilteredProducts