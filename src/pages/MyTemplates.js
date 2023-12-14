import React, { useEffect, useState } from 'react';
import { auth, db, } from "../firebaseSDK.js";
import { doc, query, where, collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import "./MyTemplate.css";

export const My_Templates = () => {
    const [user, loading, error] = useAuthState(auth);
    const [documentData, setDocumentData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            const userId = user.uid;
            console.log(userId);
            const q = query(collection(db, "Notes"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title
            }));
            setDocumentData(docs);
            console.log(docs);
        };

        fetchData();
    }, [user]); // re-run fetchData when `user` changes

    const handleCardClick = (id) => {
        navigate(`/document/${id}`);
    };

    return (
        <div>
            <h1>My Templates</h1>
            {documentData && documentData.map((doc) => (
                <div key={doc.id} onClick={() => handleCardClick(doc.id)}>
                    <h3>{doc.title}</h3>
                </div>
            ))}
        </div>
    );
};
