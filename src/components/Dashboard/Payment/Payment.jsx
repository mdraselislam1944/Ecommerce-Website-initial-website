import { stringify } from 'postcss';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOut from './CheckOut';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51NEmG3IxzytApYUlrVvQjOkLBL4TdwZ6aTq4Mz4FnMKHgzjX83FRLIjyEjCddXis3csWUdu0pnLWkkt5QSxJAjb300a5y8iSib');
const Payment = ({price,product}) => {
    const fixedMoney=parseFloat(price)

    const tk = parseFloat(fixedMoney.toFixed(2));
    return (
        <div>
            <h1 className='text-info text-2xl'>Please Payment : ${tk}</h1>
            <Elements stripe={stripePromise}>
                <CheckOut price={price} product={product}></CheckOut>
            </Elements>

        </div>
    );
};

export default Payment;