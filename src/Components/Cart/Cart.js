import React,{useState} from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {removeFromCart} from '../Features/Slices/cartSlice'
import {Navbar} from '../Navbar/Navbar'
import axios from 'axios'

const Cart = () => {
    const products=useSelector((product=>product.cart.cart))
    const dispatch=useDispatch()
    

    function placeOrder(){
        products.map((e)=>{
            const currentDate = new Date()
            axios.post('http://localhost:3001/orders',{product_name:e.name,price:e.price,quantity:e.amount,image:e.img,
            size:e.size,color:e.color,order_date:currentDate,email:localStorage.getItem('email')
        }).then((res)=>{
                console.log(res.data);
                if(res.data.message==="Data added successfully"){
                    alert('Order Placed Successfully')
                    window.location.reload()
                }
                else{
                    alert('Error occured')
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        })
       
    }


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
        {products.length>0 ?<p className="removebtn" style={{backgroundColor:'green'}} onClick={placeOrder}>Place Order</p>:
        <p>Your Cart is Empty 😥</p>
        }
            
    </div>
    </>
  )
}

export default Cart