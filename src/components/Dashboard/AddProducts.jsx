import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import swal from 'sweetalert';

const AddProducts = () => {
    const user = useContext(AuthContext);


    const handleAddClass = (event) => {

        event.preventDefault();
        const form = event.target;
        const addProducts = {
            category: form.category.value,
            name: form.name.value,
            seller: form.seller.value,
            img: form.image.value,
            price: form.price.value,
            stock:form.stock.value,
            ratings: form.ratings.value,
            ratingsCount:form.ratingsCount.value,
            shipping:form.shipping.value,
            quantity:form.quantity.value,

        };
        const imageFile = form.image.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        fetch('https://api.imgbb.com/1/upload?key=7a43c068c4477f76ae69e0549062c80e', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                addProducts.img = data.data.display_url;

                fetch('https://e-commerce-server-site-mocha.vercel.app/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addProducts)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        swal("products added successfully!", "click the button", "ok");
                        form.reset();
                    })
                    .catch(error => console.log(error.message));
            }
            );
            // console.log(addProducts);
    }
    return (
        <div className='text-center mx-auto my-5'>
            <h1 className=' my-5 text-4xl'>Please Add a new products</h1>
            <form className='grid grid-cols-1' onSubmit={handleAddClass}>
                <div>
                    <input required type="category" name="category" id="category" className='input input-bordered w-full max-w-xs mx-auto my-2 me-5' placeholder='Enter your product category' />
                    <input required type="name" name="name" id="name" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Enter your product name' />
                </div>
                <div>
                    <input required type="file" name="image" id="image" className=' w-full max-w-xs mx-auto my-2' />
                    <input required type="number" name="quantity" id="quantity" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='products shipping' />
                </div>
                <div>
                    <input required type="seller" name="seller" id="seller" className='input input-bordered w-full max-w-xs mx-auto my-2 me-5' placeholder='Enter your product seller' />
                    <input required type="number" name="price" id="price" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='price' />
                </div>
                <div>
                    <input required type="number" name="stock" id="stock" className='input input-bordered w-full max-w-xs mx-auto my-2 me-5' placeholder='Available stock' />
                    <input required type="number" name="ratings" id="ratings" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='products ratings' />
                </div>
                <div>
                    <input required type="number" name="ratingsCount" id="ratingsCount" className='input input-bordered w-full max-w-xs mx-auto my-2 me-5' placeholder='products ratingsCount' />
                    <input required type="number" name="shipping" id="shipping" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='products shipping' />
                </div>
                <input className='btn btn-success mx-auto w-full max-w-xs' type="submit" value="submit products" />
            </form>
        </div>
    );
};

export default AddProducts;