import React from 'react'
import './body.css'
import Top from './TopSection/Top'
import Listing from './ListingSection/Listing'
import { Routes, Route } from 'react-router-dom'
import ProductList from './ProductList/ProductList'
import Product from './ProductSection/Product'
import ProductDetail from './ProductDetail/ProductDetail'


const Body = () => {
  return (
    <div className='mainContent'>
      <Top />

      <div className='content'>
        {/* <Listing /> */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<Product />} />
        </Routes>
      </div>
    </div>
  )
}

export default Body