import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db, logout } from "../firebaseSDK.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./HomePage.css";

export const HomePage = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [docs, setDocIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const post = () => {};

  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollectionRef = collection(db, "Notes");
      const notesSnapshot = await getDocs(notesCollectionRef);

      const docs = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        user: doc.data().userName,
      }));
      setDocIds(docs);
      console.log(docs)
    };

    fetchNotes();
  }, []);

  const handleDocClick = (docId) => {
    navigate(`/document/${docId}`);
  };

  return (
    <>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
     <>
          </>
        ) : (
          <>
            <p>Login to create and view your own templates</p>
          </>
        )}
      </div>
      <div className="centered-container">
        <input
          type="text"
          className="input input-bordered input-lg"
          placeholder="Search Documentation"
          style={{ width: '500px' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div>
            {docs
              .filter((doc) =>
                doc.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((filteredDoc) => (
                <div
                  key={filteredDoc.id}
                  className="bg-base-200 bg-hover:cursor-pointer hover:bg-accent filtered-item rounded-md"
                  onClick={() => handleDocClick(filteredDoc.id)}
                >
                  <span className="title">{filteredDoc.title}</span>
                  <span>{filteredDoc.user}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
