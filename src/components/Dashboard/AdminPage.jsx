import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const AdminPage = () => {
    let count =1;
    const [userProduct, setUserProduct] = useState();
    useEffect(() => {
        fetch('http://localhost:4000/userProducts')
            .then(res => res.json())
            .then(data => {
                setUserProduct(data.filter(data => data.status != 'notPay'))
            })
    }, [])
    const totalPrice = userProduct?.reduce((accumulator, product) => {
        return accumulator + parseFloat(product.price);
    }, 0);
    console.log(userProduct);
    return (
        <div>
            <h1 className='text-2xl text-center text-orange-400 my-10'>Your Total Balance : ${totalPrice}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>price</th>
                            <th>Status</th>
                            <th>Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userProduct?.map(product => <tr key={product._id} className="bg-base-200 ">
                                <td>{count++}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.status == 'notPay' ? <>Not Pay</> : <>Payment Successful</>}</td>
                                <td>{product.status}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;