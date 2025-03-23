import { Suspense, lazy } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './Components/Loading/LoadingSpinner'; // Create this component
import ProductList from './Components/Dashboard/BodySection/ProductList/ProductList';

// Lazy load components for better performance
const Login = lazy(() => import('./Components/Login/Login'));
const Register = lazy(() => import('./Components/Register/Register'));
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'));
const ProductDetail = lazy(() => import('./Components/Dashboard/BodySection/ProductDetail/ProductDetail'));
const ProductForm = lazy(() => import('./Components/Dashboard/BodySection/ProductSection/Product'));

// Auth protection wrapper
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('accessToken');
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

// Public routes wrapper (redirects to dashboard if already logged in)
const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem('accessToken');
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

// App layout with common elements
const AppLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

// Define router with route groups and protection
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // Public routes group
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Login />
              </Suspense>
            )
          },
          {
            path: '/register',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Register />
              </Suspense>
            )
          }
        ]
      },
      
      // Protected routes group
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard/*',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Dashboard />
              </Suspense>
            )
          },
          {
            path: '/products-detail/:id',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ProductDetail />
              </Suspense>
            )
          },
          {
            path: '/products-create',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ProductForm />
              </Suspense>
            )
          },
          {
            path: '/list',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
               <ProductList/>
              </Suspense>
            )
          }
        ]
      },
      
      // Catch-all route for 404
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);

// Simple LoadingSpinner component
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;