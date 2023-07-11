import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/Main.jsx';
import Home from './components/Home.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Login from './components/Login.jsx';
import SingUp from './components/SingUp.jsx';
import AuthProvider from './Providers/AuthProviders.jsx';
import Dashboard from './components/Dashboard.jsx';
import Users from './components/Dashboard/Users.jsx';
import AddProducts from './components/Dashboard/AddProducts.jsx';
import IndividualProducts from './components/IndividualProducts.jsx';
import SelectedProducts from './components/Dashboard/SelectedProducts.jsx';
import SearchProduct from './components/SearchProduct.jsx';
import PaymentHistory from './components/Dashboard/PaymentHistory.jsx';
import AdminPage from './components/Dashboard/AdminPage.jsx';
import DashboardDescription from './components/Dashboard/DashboardDescription.jsx';
import PrivateRoute from './PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:<Main/>,
    loader:()=> fetch('https://e-commerce-server-site-mocha.vercel.app/userProducts'),
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:'/products/:id',
        element:<PrivateRoute><ProductDetails/></PrivateRoute>,
        loader:({params})=>fetch(`https://e-commerce-server-site-mocha.vercel.app/product/${params.id}`),
      },
      {
        path:'individualProduct/:id',
        element:<IndividualProducts/>,
        loader:({params})=>fetch(`https://e-commerce-server-site-mocha.vercel.app/products/${params.id}`)
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:"/signUp",
        element:<SingUp/>
      },
      {
        path:"/search/:id",
        element:<SearchProduct/>,
        loader:({params})=>fetch(`https://e-commerce-server-site-mocha.vercel.app/products/selected/${params.id}`),
      }
    ]
  },
  {
    path:'dashboard',
    element:<Dashboard/>,
    loader:()=>fetch('https://e-commerce-server-site-mocha.vercel.app/users'),
    children:[
      // {
      //   path:"",
      //   element:<DashboardDescription/>,
      //   loader:()=>fetch('https://e-commerce-server-site-mocha.vercel.app/users'),
      // },
      {
        path:'userPage',
        element:<SelectedProducts/>,
        loader:()=>fetch('https://e-commerce-server-site-mocha.vercel.app/userProducts')
      },
      {
        path:"adminPage",
        element:<AdminPage/>,
      },
      {
        path:"users",
        element:<Users/>,
        loader:()=>fetch('https://e-commerce-server-site-mocha.vercel.app/users'),
      },
      {
        path:'addProducts',
        element:<AddProducts/>
      },
      {
        path:"paymentHistory",
        element:<PaymentHistory/>,
        loader:()=>fetch('https://e-commerce-server-site-mocha.vercel.app/userProducts')
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
<React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
</AuthProvider>,
)
