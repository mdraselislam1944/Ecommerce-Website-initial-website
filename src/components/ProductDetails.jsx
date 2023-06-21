import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ProductDetails = () => {
    const product=useLoaderData();
    console.log(product)
    return (
        <div className='flex items-center justify-around'>
           <div>
            <h1>Product name: {product.name}</h1>
            <p>product Category: {product.category}</p>
            <p>price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Ratings: {product.ratings}</p>
            <p>ratingsCount: {product.ratingsCount}</p>
            <p>Seller: {product.seller}</p>
            <p>Shipping: {product.shipping}</p>
            <p>stock: {product.stock}</p>
            <Link className='btn btn-info my-5'>Buy Product</Link>
           </div>
           <div>
            <img className='h-96 w-full my-5' src={product?.img} alt="" srcset="" />
           </div>
        </div>
    );
};

export default ProductDetails;