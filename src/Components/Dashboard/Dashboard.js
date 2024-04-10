import React,{useState,useEffect} from 'react'
import '../Cart/style.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {removeFromCart} from '../Features/Slices/cartSlice'
import {Navbar} from '../Navbar/Navbar'
import axios from 'axios'

const Cart = () => {
    const [orderList,setorderList]=useState([])
    
useEffect(()=>{
  axios.post('http://localhost:3001/getOrders',{email:localStorage.getItem('email')}).then((res)=>{
    // console.log(res.data);
    setorderList(res.data)
})
.catch((err)=>{
    console.log(err);
})
},[])

  return (
    <>
    <Navbar />
    <div class="flex-container-cart">

        {
            orderList && orderList.map((products,key)=>
                <div class="cart-details">
                    <div><img src={products.image} loading='lazy'/></div>
                    <div>Name : {products.product_name}</div>
                    <div>Color : {products.color}</div>
                    <div>Size : {products.size}</div>
                    <div>{products.price}rs * {products.quantity===1?`${products.quantity} piece`:`${products.quantity} pieces`}</div>
                    <div>Total Price : {products.price*products.quantity}</div>
                    {/* <div><button className="removebtn" onClick={()=>dispatch(removeFromCart(
                        products
                    ))}>Remove</button></div> */}
                </div>
            )
        }
        {orderList && orderList.length===0 && <p>No Orders yet 😥</p>
        }
            
    </div>
    </>
  )
}

export default Cart