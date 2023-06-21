import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../public/Slide1.jpg';
import img2 from '../../public/Slide2.jpeg';
import img3 from '../../public/Slide3.jpg';
const Home = () => {
    const [products, setProducts] = useState();
    useEffect(() => {

        fetch('https://e-commerce-server-site-mocha.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                console.log(data)
            })
    }, [])
    return (
        <div>
            <div>
                <div className="carousel w-full">
                    <div id="item1" className="carousel-item w-full">
                        <img src={img1} className="w-full h-96" />
                    </div>
                    <div id="item2" className="carousel-item w-full ">
                        <img src={img2} className="w-full h-96" />
                    </div>
                    <div id="item3" className="carousel-item w-full">
                        <img src={img3} className="w-full h-96" />
                    </div>
                    <div id="item4" className="carousel-item w-full">
                        <img src={img2} className="w-full h-96" />
                    </div>
                </div>
                <div className="flex justify-center w-full py-2 gap-2">
                    <a href="#item1" className="btn btn-xs">1</a>
                    <a href="#item2" className="btn btn-xs">2</a>
                    <a href="#item3" className="btn btn-xs">3</a>
                    <a href="#item4" className="btn btn-xs">4</a>
                </div>
            </div>
            <div className='grid grid-cols-3 ms-16 gap-4'>
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
        </div>
    );
};

export default Home;