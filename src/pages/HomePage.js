import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db, logout } from "../firebaseSDK.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./HomePage.css";

export const HomePage = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [docIds, setDocIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const post = () => {};

  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollectionRef = collection(db, "Notes");
      const notesSnapshot = await getDocs(notesCollectionRef);

      const ids = notesSnapshot.docs.map((doc) => doc.id);
      setDocIds(ids);
    };

    fetchNotes();
  }, []);

  const handleDocClick = (docId) => {
    navigate(`/document/${docId}`);
  };

  return (
    <>
      <h1>Buffalo Surgery Documentation Wiki</h1>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <>
          <button onClick={logout}>Logout</button>
          <button onClick={() => navigate('create')}>Create your own template!</button>
          </>
        ) : (
          <>
          <h2>You must login to create your own templates!</h2>
          <button onClick={() => navigate('login')}>Login</button>
          </>
        )}
      </div>
      <div class="centered-container">
        <input
          type="text"
          className="App-input"
          placeholder="Search Documentation"
          style={{}}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div>
            {docIds
              .filter((id) =>
                id.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((filteredId) => (
                <p
                  key={filteredId}
                  className="filtered-item"
                  onClick={() => handleDocClick(filteredId)}
                >
                  {filteredId}
                </p>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
