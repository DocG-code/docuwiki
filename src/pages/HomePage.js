import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../firebaseSDK.js";

export const HomePage = () => {
  const navigate = useNavigate();
  const [docIds, setDocIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const db = getFirestore(firebaseApp);
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
      <div class="centered-container">
        <input
          type="text"
          className="App-input"
          placeholder="Search Documentation"
          style={{

          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div>
            {docIds
              .filter((id) =>
                id.toLowerCase().includes(searchTerm.toLowerCase()),
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
