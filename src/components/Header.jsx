import React from 'react';
import { FaCartArrowDown, FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className='flex justify-between items-center  bg-black text-white p-5'>
                <div className='flex  items-center'>
                    <h1 className='mx-5 text-4xl'>REZZYSTYLE</h1>
                    <Link to='/' className='btn btn-info' >Home</Link>
                </div>
                <div className='flex  items-center'>
                    <input type="text" placeholder="Type Product" className="input input-bordered input-primary w-full max-w-xs " />
                    <button className='btn btn-info'>Search</button>
                </div>
                <div className='flex  items-center'>
                    <h3 className='flex items-center'> <FaCartArrowDown className='mx-2' /> Cart</h3>
                    <h3 className='flex items-center mx-5'> <FaUserAlt className='mx-2' /> SignIn</h3>
                </div>
            </div>
            <div className='flex items-center  bg-green-300 text-white p-3'>
                <button className='btn  btn-neutral mx-8 lg:ms-96'>BAISHAKI STYLES</button>
                <button className="btn  btn-neutral mx-8">EID COLLECTION</button>
                <button className="btn  btn-neutral mx-8">GENTS</button>
                <button className="btn  btn-neutral mx-8">GIRLS</button>
                <button className="btn  btn-neutral mx-8 ">KIDS</button>
            </div>
        </>
    );
};

export default Header;