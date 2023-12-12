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
      }));
      setDocIds(docs);
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
            <button onClick={() => navigate("create")}>
              Create your own template!
            </button>
            <button onClick={() => navigate("mytemplates")}>
              My templates
            </button>
          </>
        ) : (
          <>
            <h2>You must login to create your own templates!</h2>
            <button onClick={() => navigate("login")}>Login</button>
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
            {docs
              .filter((doc) =>
                doc.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((filteredDoc) => (
                <p
                  key={filteredDoc.id}
                  className="filtered-item"
                  onClick={() => handleDocClick(filteredDoc.id)}
                >
                  {filteredDoc.title}
                </p>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
