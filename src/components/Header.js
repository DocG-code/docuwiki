import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebaseSDK.js";
import "./Header.css";

export const Header = () => {
    const [user] = useAuthState(auth);

    return (
        <header>
            <h1>Surgery Documentation Wizard</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Search</Link>
                    </li>
                    {user && (
                        <>
                            <li>
                                <Link to="/mytemplates">My templates</Link>
                            </li>
                            <li>
                                <Link to="/create">Create new template</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <button className="headerButton" onClick={user ? logout : null}>
                            {user ? 'Logout' : <Link to="/login">Login</Link>}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

