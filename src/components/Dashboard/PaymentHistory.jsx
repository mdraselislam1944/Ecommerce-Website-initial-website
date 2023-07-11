import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';

const PaymentHistory = () => {
    let count=1;
    const products = useLoaderData();
    const users = useContext(AuthContext);
    const filterProduct = products.filter(product => product.email == users?.user?.email&&product.status!='notPay')
    const [product, setProduct] = useState(filterProduct);
    // console.log(product);
    return (
        <div className="overflow-x-auto">
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>payment</th>
                    <th>Payment Transaction Id</th>
                </tr>
            </thead>
            <tbody>
                {
                    product.map(payment => <tr key={payment._id} className="bg-base-200">
                        <td>{count++}</td>
                        <td>{payment.name}</td>
                        <td>{payment.price}</td>
                        <td>{payment.status}</td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
    );
};

export default PaymentHistory;