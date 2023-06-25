import React, { useContext, useEffect } from 'react';
import { FaCartArrowDown, FaGratipay, FaHome, FaUsers } from 'react-icons/fa';
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Dashboard = () => {
    const navigate = useNavigate();
    const usersDB = useLoaderData();
    const users = useContext(AuthContext);
    const user = usersDB.find(user => user.email == users?.user?.email);
    console.log(user?.role)
    useEffect(() => {
        if (user?.role == 'admin') {
            navigate('/dashboard/adminPage')
        }
        else {
            navigate('/dashboard/userPage')
        }
    }, [])
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="bg-yellow-200 text-center h-[100vh]">
                <div className='my-5 mx-10'>
                    <Link className='flex items-center text-xl mt-2' to='/'>
                        <FaHome />
                        <p className='mx-2'>Home</p>
                    </Link>
                    {
                        user?.role == 'admin' && <>
                            <Link className='flex items-center text-xl mt-2' to='users'>
                                <FaUsers />
                                <p className='mx-2'>users</p>
                            </Link>
                            <Link className='flex items-center text-xl mt-2' to='addProducts'>
                                <FaCartArrowDown />
                                <p className='mx-2 flex-nowrap'>Add Products</p>
                            </Link>
                        </>
                    }
                    {
                         user?.role == 'buyer' && <Link className='flex items-center text-xl mt-2' to='paymentHistory'>
                            <FaGratipay />
                            <p className='mx-2 flex-nowrap'>PaymentHistory</p>
                        </Link>
                    }
                </div>
            </div>
            <div className="col-span-3 my-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;