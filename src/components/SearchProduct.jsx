import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const SearchProduct = () => {
    const products = useLoaderData();
    // console.log(products);
    return (
        <div>
            {
                products[0] ? <>
                    <div className='grid grid-cols-3 ms-16 gap-4 my-5'>

                        {
                            products?.map(product => <div key={product._id} className="card w-96 bg-base-100 shadow-xl " >
                                <figure><img src={product.img} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{product.category}</h2>
                                    <div className='flex items-center justify-around'>
                                        <p>Price: ${product.price}</p>
                                        <p>Stocks: {product.stock}</p>
                                    </div>
                                    <div className="card-actions justify-center">
                                        <Link to={`/products/${product._id}`} className="btn btn-primary">Show Details</Link>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </> : <h1 className='text-center text-3xl my-6 text-orange-300'>your search item not found</h1>
            }
        </div>
    );
};

export default SearchProduct;

