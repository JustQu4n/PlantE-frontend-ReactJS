"use client";
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ProductDetail from './Components/Dashboard/BodySection/ProductDetail/ProductDetail';
import ProductForm from './Components/Dashboard/BodySection/ProductSection/Product';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/register',
    element: <div><Register /></div>
  },
  {
    path: '/dashboard/*',
    element: <div><Dashboard /></div>
  },
  {
    path: '/products-detail/:id',
    element: <div><ProductDetail /></div>
  },
  {
    path: '/products-create',
    element: <div><ProductForm /></div>
  }
])

function App() {

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
