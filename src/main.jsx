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


const router = createBrowserRouter([
  {
    path: "/",
    element:<Main/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:'/products/:id',
        element:<ProductDetails/>,
        loader:({params})=>fetch(`https://e-commerce-server-site-mocha.vercel.app/products/${params.id}`),
      },
      {
        path:'individualProduct/:id',
        element:<IndividualProducts/>,
        loader:({params})=>fetch(`http://localhost:4000/products/${params.id}`)
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:"/signUp",
        element:<SingUp/>
      }
    ]
  },
  {
    path:'dashboard',
    element:<Dashboard/>,
    children:[
      {
        path:"users",
        element:<Users/>
      },
      {
        path:'addProducts',
        element:<AddProducts/>
      },
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
