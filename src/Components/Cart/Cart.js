import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {removeFromCart} from '../Features/Slices/cartSlice'
import {Navbar} from '../Navbar/Navbar'
const Cart = () => {
    const products=useSelector((product=>product.cart.cart))
    const dispatch=useDispatch()
    console.log(products)
  return (
    <>
    <Navbar />
    <div class="flex-container-cart">

        {
            products.map((products,key)=>
                <div class="cart-details">
                    <div><img src={products.img} loading='lazy'/></div>
                    <div>Name : {products.name}</div>
                    <div>Color : {products.color}</div>
                    <div>Size : {products.size}</div>
                    <div>{products.price}rs * {products.amount} piece</div>
                    <div>Total Price : {products.totalPrice}</div>
                    <div><button className="removebtn" onClick={()=>dispatch(removeFromCart(
                        products
                    ))}>Remove</button></div>
                </div>
            )
        }
            
    </div>
    </>
  )
}

export default Cart