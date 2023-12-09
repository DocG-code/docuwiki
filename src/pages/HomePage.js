import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../firebaseSDK.js";

export const HomePage = () => {
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

  return (
    <>
      <input
        type="text"
        className="App-text-input"
        placeholder="Search Documentation"
        style={{
          marginTop: "20px",
          padding: "10px",
          width: "300px",
          border: "2px solid #61dafb",
          borderRadius: "5px",
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <div>
          {docIds
            .filter((id) => id.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((filteredId) => (
              <p key={filteredId}>{filteredId}</p>
            ))}
        </div>
      )}
    </>
  );
};
