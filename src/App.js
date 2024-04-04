import React from 'react'
import './App.css';
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Main = React.lazy(() => import('./Components/Main/Main'))
const FilteredProducts = React.lazy(() => import('./Components/FilteredProducts/FilteredProducts'))
const SingleProduct = React.lazy(() => import('./Components/SingleProduct/SingleProduct'))
const Cart = React.lazy(() => import('./Components/Cart/Cart'))
const Login=React.lazy(()=>import('./Components/Login/Login'))
const Signup=React.lazy(()=>import('./Components/Signup/Signup'))

function App() {

  const cart = useSelector((state) => state.cart.cart)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const totalPrice = useSelector((state) => state.cart.totalPrice)

  // console.log('cart', cart)
  // console.log('totalAmount', totalAmount)
  // console.log('totalPrice', totalPrice)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <React.Suspense fallback='Loading Login Component'>
              <Login />
            </React.Suspense>}>
          </Route>

          <Route path='/signup' element={
            <React.Suspense fallback='Loading Signup Component'>
              <Signup />
            </React.Suspense>}>
          </Route>

          <Route path='/home' element={
            <React.Suspense fallback='Loading Main Component'>
              <Main />
            </React.Suspense>}>
          </Route>
          <Route path='/filteredProducts/:type' element={
            <React.Suspense fallback='Loading Filtered Products Component'>
              <FilteredProducts />
            </React.Suspense>}></Route>
          <Route
            path="/filteredProducts/:type/:id"
            element={
              <React.Suspense fallback='Loading Single Products Component'>
                <SingleProduct />
              </React.Suspense>}

          ></Route>
          <Route path='/cart' element={
            <React.Suspense fallback='Loading Cart Component'>
              <Cart />
            </React.Suspense>
          } />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
