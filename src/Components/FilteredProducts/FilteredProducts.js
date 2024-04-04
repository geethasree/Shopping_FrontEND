import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { viewSelectedProduct } from '../Features/Slices/ProductsSlice'
import { Navbar } from '../Navbar/Navbar'
import './style.css'
import axios from 'axios'


const FilteredProducts = () => {
  const products = useSelector((product) => product.products.filteredProducts)
  const dispatch = useDispatch()
  const { type } = useParams()
  // console.log('Looking for ',products,'and',type)
  const [productList, setProductList] = useState([])

  useEffect(() => {
    axios.post('http://localhost:3001/get_products_from_types', { type }).then((res) => {
      setProductList(res.data)
    })
      .catch((err) => {
        console.log(err);
      })
  }, [type])

  return (
    <>
      <Navbar />
      <div className='flex-containerfilter'>
        <p>Looking for <span>{type}</span></p>
        <div className='flexfilter'>
          {
            productList && productList.map((eachProduct,id) =>
              <NavLink  key={id} to={'/filteredProducts/' + type + '/' + eachProduct.id} className='flex-itemfilter' onClick={() =>{
                localStorage.setItem('productDetails',JSON.stringify(eachProduct))
              }}>

                <div className="imagediv">
                  <img src={eachProduct.img} />
                </div>
                <p className='productname'><b>{eachProduct.name}</b></p>
                <p>{eachProduct.text}</p>
                <div className='priceandcolors'>
                  <p className='productprice'>Rs {eachProduct.price}/-</p>
                  {
                    JSON.parse(eachProduct.color).map((color,id1) => <span key={id1} style={{ 'backgroundColor': color }} className='colorsavailable'></span>)
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