import React, { useEffect, useState } from 'react';
import { auth, db, } from "../firebaseSDK.js";
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import "./Post.css";

export const Template_Post = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [procedureCode, setProcedureCode] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [buttonText, setButtonText] = useState('Submit');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const docData = {
          title,
          procedureCode,
          content,
          userId: user.uid,
        };
    
        try {
          await addDoc(collection(db, 'Notes'), docData);
          console.log('Document written with ID: ', docData.title);
          setTitle('');
          setProcedureCode('');
          setContent('');
          setButtonText('Template submitted');
          setTimeout(() => setButtonText('Submit'), 2000); // Reset button text after 2 seconds
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      };  

    useEffect(() => {     
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!user) navigate("/Login");
    }, [user, loading]);
    return(
        <form onSubmit={handleSubmit}>
            <label>
                title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
        <label>
          Procedure Codes:
          <input type="text" value={procedureCode} onChange={(e) => setProcedureCode(e.target.value)} />
        </label>
        <label>
          Note Template:
          <textarea className="textarea" value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button type="submit">{buttonText}</button>
      </form>
        
    );
}