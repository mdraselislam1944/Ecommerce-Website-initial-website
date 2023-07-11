import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Users = () => {
    let count = 1;
    const usersDB = useLoaderData();
    // console.log(usersDB)
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersDB.map(user => <tr key={user._id} className="bg-base-200">
                            <td>{count++}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className='btn btn-info me-5'>Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Users;