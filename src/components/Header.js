import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebaseSDK.js";
import "./Header.css";

export const Header = () => {
    const [user] = useAuthState(auth);

    return (
        <header>
            <h1>Surgery Documentation Wiki</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {user && (
                        <>
                            <li>
                                <Link to="/mytemplates">My Templates</Link>
                            </li>
                            <li>
                                <Link to="/create">Create New Template</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <button onClick={user ? logout : null}>
                            {user ? 'Logout' : <Link to="/login">Login</Link>}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

