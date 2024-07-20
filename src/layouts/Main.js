import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import DetailProduct from './viewItem/DetailProduct'
import ProductCategory from './viewItem/ProductCategory';
import Content from './../components/Content';
import ProductSearch from './viewItem/ProductSearch';
import SignUp from './authen/SignUp';
import SignIn from './authen/SignIn';
import MyProfile from './../components/MyProfile';
import ShoppingCart from './order/ShoppingCart';
import AllProduct from './viewItem/AllProduct';
import CheckOut from './order/CheckOut';
import ProductBrand from './viewItem/ProductBrand';
import RequestStatusPayment from './order/RequestStatusPayment';
import ConfirmEmailScreen from './authen/ConfirmEmailScreen';
import ForgotPassword from './forgotPassword/ForgotPassword';
import ResetPassword from './forgotPassword/ResetPassword';
import Order from './order/Order';
import ConfirmCode from './forgotPassword/ConfirmCode';
import OrderDetail from './order/OrderDetail';
import AllTopic from './viewItem/AllTopic';
import Post from './viewItem/Post';
import DetailPost from './viewItem/DetailPost';

const Main = ( ) => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/checkout" element={<CheckOut />} />


            <Route path="/signup" element={<SignUp />} />
            <Route path="/confirmemail" element={<ConfirmEmailScreen />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/confirm-code" element={<ConfirmCode />} />

            <Route path="/resetpassword" element={<ResetPassword />} />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/allproducts" element={<AllProduct />} />

            <Route path="/products/:id" element={<DetailProduct />} />
            <Route path="/products/category/:cateId" element={<ProductCategory />} />
            <Route path="/products/brand/:brandId" element={<ProductBrand />} />
            <Route path="/topic" element={<AllTopic />} />
            <Route path="/topic/:id" element={<Post />} />

            <Route path="/topic/post/:id" element={<DetailPost />} />

            <Route path="/products/tag/:tagId" element={<ProductCategory />} />


            <Route path="/search" element={<ProductSearch/>} />
            <Route path="/shoppingcart" element={<ShoppingCart/>}/>
            <Route path="/checkout" element={<CheckOut/>}/>
            <Route path="/statuspayment" element={<RequestStatusPayment/>}/>
            <Route path="/orderlist" element={<Order/>}/>
            <Route path="/order/:id" element={<OrderDetail />} />

          



        </Routes>
    </main>
  )
}
export default Main
