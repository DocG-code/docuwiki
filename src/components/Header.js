import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebaseSDK.js";
import Navbar from '../components/NavLogin.js';

export const Header = () => {
    const [user] = useAuthState(auth);

    return (
        <header className=''>
            <Navbar/>
        </header>
    );
};

