import React from 'react';
import Header from './Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import Footer from './Footer';

const Main = () => {
    const product=useLoaderData();
    // console.log(product)
    return (
        <div>
            <Header product={product}/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;