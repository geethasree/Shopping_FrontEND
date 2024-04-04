import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { addToCart } from '../Features/Slices/cartSlice'
import './style.css'
import { Navbar } from '../Navbar/Navbar'
const SingleProduct = () => {
  const {type,id}=useParams()
  const dispatch=useDispatch()
  // const productDetails?=useSelector((prod)=>prod.products.selectedProduct)[0];
  // console.log("product",productDetails?.id)
  
  const [productDetails,setProductDetails]=useState({})
  useEffect(()=>{
    const data=localStorage.getItem('productDetails')
   data && setProductDetails(JSON.parse(data))
  },[])
  
  return (
    <>
        <Navbar />
        <div class='flex-container'>
            <div class='flex-item-img'>
              <img src={productDetails?.img} />
            </div>
            <div class='item-description'>
              <h2>{productDetails?.name}</h2>
              <p>{productDetails?.text}</p>
              <p><b>Category : </b>{productDetails?.type}</p>
              <p><b>Choose Size </b></p>
              <select id='size'>
                
                {
                 productDetails?.size &&  JSON.parse(productDetails?.size).map((eachSize)=><option value={eachSize}>{eachSize}</option>)
                }
              </select>
              <br />
              <p><b>Choose Color </b></p>
              <select id='color'>
                
                {
                  productDetails?.color && JSON.parse(productDetails?.color).map((eachColor)=><option value={eachColor}>{eachColor}</option>)
                }
              </select>
              <br />
              <br />
              <button class='addtocartbtn' onClick={()=>dispatch(addToCart(
                {
                  id:productDetails?.id,
                  name:productDetails?.name,
                  size:document.querySelector('#size').value,
                  color:document.querySelector('#color').value,
                  img:productDetails?.img,
                  text:productDetails?.text,
                  price:productDetails?.price,
                  amount:1,
                  totalprice:productDetails?.price
                }
              ))}>Add to Cart</button>
            </div>
        </div>
    </>
  )
}

export default SingleProduct