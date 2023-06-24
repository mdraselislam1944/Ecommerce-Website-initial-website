import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import swal from 'sweetalert';

const SelectedProducts = () => {
    let count=1;
    const products=useLoaderData();
    const users=useContext(AuthContext);
    const filterProduct=products.filter(product=>product.email==users?.user?.email)
    // console.log(product)
    const [product, setProduct] = useState(filterProduct);
    const handleDelete=(id)=>{
        swal({
            title: "Are you delete?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:4000/userProducts/${id}`,{
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            setProduct(product?.filter(product => product._id !== id));
                            console.log(data);
                            if (data.deletedCount > 0) {
                                // alert('delete successful');
                            }
                        })
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    return (
        <div className="overflow-x-auto">
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>price</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    product.map(product => <tr key={product._id} className="bg-base-200 ">
                        <td>{count++}</td>
                        <td>{product.name}</td>
                        <td>$ {product.price}</td>
                        <td>{product.status}</td>
                        <td>
                        <button className='btn btn-info me-5'>Payment</button>
                        </td>
                        <td>
                            <button onClick={()=>handleDelete(product._id)} className='btn btn-info me-5'>Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
    );
};

export default SelectedProducts;