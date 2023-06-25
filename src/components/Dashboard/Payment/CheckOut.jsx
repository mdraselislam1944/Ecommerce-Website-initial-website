import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

const CheckOut = ({ price, product }) => {
    console.log(product)
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/create-payment-intent', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setClientSecret(data.clientSecret)
                // alert('added successfully');
            })
            .catch(error => console.log(error.message));
    }, [])
    // console.log(clientSecret);
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCardError(error.message);
        }
        else {
            setCardError('');
            // console.log(paymentMethod);
        }
        const { paymentIntent, error: confirmedError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: 'jenny Rosen',
                    },
                },
            },
        );
        if (confirmedError) {
            // console.log(confirmedError)
            swal({
                title: "Payment failed",
                text: "back!",
                icon: "warning",
                button: "ok!",
            });
        }
        // console.log(paymentIntent?.status);
        console.log(paymentIntent)
        if (paymentIntent?.status) {
            product?.map(product => {
               const paymentHistory={
                id:paymentIntent.id,
                }
                console.log(paymentHistory)
                fetch(`http://localhost:4000/userProducts/payment/${product?._id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({paymentHistory})
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            // swal({
                            //     title: 'Feedback sent',
                            //     text: "You clicked the button!",
                            //     icon: "success",
                            // });
                        }
                        else {
                            // swal({
                            //     title: 'you also sent previous data',
                            //     text: "You clicked the button!",
                            //     icon: "success",
                            // });
                        }
                    });
            })
            swal({
                title: "Payment success",
                text: "back!",
                icon: "success",
                button: "ok!",
            });
        }
        // else{
        //     swal({
        //         title: "Payment failed",
        //         text: "back!",
        //         icon: "warning",
        //         button: "ok!",
        //       });
        // }
    };
    return (
        <>
            <form className='w-2/3 m-10' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='mt-5 btn btn-outline btn-primary' type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-600'>{cardError}</p>
            }
        </>
    );
};

export default CheckOut;