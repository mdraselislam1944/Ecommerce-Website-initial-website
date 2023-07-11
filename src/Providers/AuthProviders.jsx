import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/Firebse';
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const githubLogin = () => {
        return signInWithPopup(auth, githubProvider);
    }
    const updateProfileDetail = (name) => {
        return updateProfile(auth.currentUser, { displayName: name });
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log(currentUser.email)
            setLoading(false);
            if (currentUser && currentUser.email) {
                const loggedUser = {

                    email: currentUser.email,
                }
                fetch('https://e-commerce-server-site-mocha.vercel.app/jwt', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('jwt response', data);
                        localStorage.setItem('ecommerce-access-token', data.token);
                    })
            }
            else {
                localStorage.removeItem('ecommerce-access-token');
            }
        });


        return () => {
            return unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleLogin,
        githubLogin,
        updateProfileDetail,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;