import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';


const Login = () => {
    const { signIn, googleLogin, githubLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    // console.log(from);
    const handleSingIn = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                console.log(result);
                alert('login successfully');
                form.reset();
                navigate(from, { replace: true })

            })
            .catch(error => {
                alert(error.message);
            });
    }
    const handleGoogleSignIn = () => {
        googleLogin()
            .then((result) => {
                // Authentication successful
            })
            .catch((error) => {
                if (error.code === 'auth/popup-closed-by-user') {
                    // Handle the popup closed by the user
                    console.log('Authentication popup closed by the user');
                } else {
                    // Handle other authentication errors
                    console.log('Authentication error:', error);
                }
            });
    }

    return (
        <>
            <div className='text-center my-10'>
                <h1 className='text-3xl'>Please Login with Email and password</h1>
                <form className='my-5' onSubmit={handleSingIn}>
                    <input type="email" name="email" id="email" className="input input-bordered input-info w-full max-w-xs" placeholder="Enter your Register Email" required /><br />
                    <input type="password" name="password" id="password" placeholder="Enter your Register password" className=" my-2 input input-bordered input-info w-full max-w-xs" required /><br />
                    <input className=" btn btn-info  w-full max-w-xs" type="submit" value="login" />
                </form>
                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary w-80 my-3">SignIn with Google</button>
            </div>
            <div className='text-3xl text-center my-5'>

                <small className='mx-2'>Are you new user? Please</small>
                <Link to='/signUp'><button className="btn btn-outline btn-info ">Register</button></Link>
            </div>
        </>
    );
};

export default Login;