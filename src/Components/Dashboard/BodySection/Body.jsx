import React from 'react'
import './body.css'
import Top from './TopSection/Top'
import Listing from './ListingSection/Listing'
import { Routes, Route } from 'react-router-dom'
import ProductList from './ProductList/ProductList'
import Product from './ProductSection/Product'


const Body = () => {
  return (
    <div className='mainContent'>
      <Top />
      <div className='product-container'>
      <div className="product-list"><ProductList /></div>
      <div className="product-form-container"><Product /></div>
      </div>
    </div>
  )
}

export default Body