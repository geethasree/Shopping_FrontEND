import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { addToCart } from '../Features/Slices/cartSlice'
import './style.css'
import { Navbar } from '../Navbar/Navbar'
const SingleProduct = () => {

  const {type,id}=useParams()
  const dispatch=useDispatch()
  const selectedproduct=useSelector((prod)=>prod.products.selectedProduct)[0];
  console.log("product",selectedproduct.id)
  return (
    <>
        <Navbar />
        <div class='flex-container'>
            <div class='flex-item-img'>
              <img src={selectedproduct.img} />
            </div>
            <div class='item-description'>
              <h2>{selectedproduct.name}</h2>
              <p>{selectedproduct.text}</p>
              <p><b>Category : </b>{selectedproduct.type}</p>
              {console.log(selectedproduct)}
              <p><b>Choose Size </b></p>
              <select id='size'>
                
                {
                  selectedproduct.size.map((eachSize)=><option value={eachSize}>{eachSize}</option>)
                }
              </select>
              <br />
              <p><b>Choose Color </b></p>
              <select id='color'>
                
                {
                  selectedproduct.color.map((eachColor)=><option value={eachColor}>{eachColor}</option>)
                }
              </select>
              <br />
              <br />
              <button class='addtocartbtn' onClick={()=>dispatch(addToCart(
                {
                  id:selectedproduct.id,
                  name:selectedproduct.name,
                  size:document.querySelector('#size').value,
                  color:document.querySelector('#color').value,
                  img:selectedproduct.img,
                  text:selectedproduct.text,
                  price:selectedproduct.price,
                  amount:1,
                  totalprice:selectedproduct.price
                }
              ))}>Add to Cart</button>
            </div>
        </div>
    </>
  )
}

export default SingleProduct