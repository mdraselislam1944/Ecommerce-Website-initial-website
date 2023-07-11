import React, { useContext } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const ProductDetails = () => {
    const navigate=useNavigate();
    const product = useLoaderData();
    const users = useContext(AuthContext);
    console.log(product)
    // console.log(users?.user?.email)
    const handleAddedData = () => {
        const buyProduct = {
            email: users?.user?.email,
            name: product.name,
            price: product.price,
            id: product._id,
            status:'notPay',
        }
        // console.log(buyProduct);
        fetch('https://e-commerce-server-site-mocha.vercel.app/userProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buyProduct)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                alert('added successfully');
                navigate('/');
            })
            .catch(error => console.log(error.message));
    }
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
            <button onClick={handleAddedData} className='btn btn-info my-5'>Buy Product</button>
        </div>
        <div>
            <img className='h-96 w-full my-5' src={product?.img} alt="" />
        </div>
    </div>
);
};

export default ProductDetails;