import React, { useContext } from 'react';
import { FaCartArrowDown, FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Header = () => {
    const {logOut}=useContext(AuthContext);
    const user=useContext(AuthContext);
    console.log(user?.user?.displayName)
    const handleLogout=()=>{
        logOut()
        .then(result=>{
            alert('logout successfully')
        })
        .catch(error=>{
            alert('error');
        })
    }
    return (
        <>
            <div className='flex justify-between items-center  bg-black text-white p-5'>
                <div className='flex  items-center'>
                    <h1 className='mx-5 text-4xl'>REZZYSTYLE</h1>
                    <Link to='/' className='btn btn-info' >Home</Link>
                </div>
                <div className='flex  items-center'>
                    <input type="text" placeholder="Type Product" className="input input-bordered input-primary w-full max-w-xs text-black" />
                    <button className='btn btn-info'>Search</button>
                </div>
                <div className='flex  items-center'>
                    <h3 className='flex items-center'> <FaCartArrowDown className='mx-2' /> Cart</h3>
                   {
                    user?.user?<><Link className='btn btn-secondary mx-5' to='dashboard'>Dashboard</Link><button className='btn btn-accent grid grid-cols-1 pt-2 pb-10' onClick={handleLogout}>
                        <p>{user?.user?.displayName}</p>
                        <h3 className='text-center'>Logout</h3></button></>:
                    <Link to='/login'><h3 className='flex items-center mx-5'> <FaUserAlt className='mx-2' /> SignIn</h3></Link>
                   }
                </div>
            </div>
            <div className='flex items-center  bg-green-300 text-white p-3'>
             <Link to='individualProduct/baishakhi'><button  className='btn  btn-neutral mx-8 lg:ms-96'>BAISHAKI STYLES</button></Link>
             <Link to='individualProduct/eidcollection'><button className="btn  btn-neutral mx-8">EID COLLECTION</button></Link>
             <Link to='individualProduct/gents'><button className="btn  btn-neutral mx-8">GENTS</button></Link>
             <Link to='individualProduct/girls'><button className="btn  btn-neutral mx-8">GIRLS</button></Link>
             <Link to='individualProduct/kids'><button className="btn  btn-neutral mx-8 ">KIDS</button></Link>
            </div>
        </>
    );
};

export default Header;