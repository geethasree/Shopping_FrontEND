import React,{useState} from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavigateButtons from '../Navigatebuttons/NavigateButtons'
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const noofitems=useSelector((noofitems)=>noofitems.cart.totalAmount)
  const buttons=useSelector((data)=>data.products.productCategories)
  const [showcategories,setShowcategories]=useState(true);
  const navigate=useNavigate()
  return (
    <>
    <div className="flex-container-nav">
      <div className="flex-item-nav logo">
          Ecomm
      </div>
      <div className="flex-item-nav menu">
        <div className="flex-item-nav-menu" onClick={()=>navigate('/')} style={{cursor:'pointer'}}>
            Logout
        </div>
        <div className="flex-item-nav-menu" onClick={()=>navigate('/dashboard')} style={{cursor:'pointer'}}>
            Your Orders
        </div>
        <div className="flex-item-nav-menu caregorybtn" onClick={()=>setShowcategories(!showcategories)}>
            {showcategories?'Hide Categories':'Show Categories'}
            
        </div>
        <div className="flex-item-nav-menu">
            <NavLink to='/cart' className='noofitems'>Cart ({noofitems})</NavLink>
        </div>
      </div>
    </div>
    { showcategories ? <NavigateButtons/> : '' }
    </>
  )
}

export default Navbar
