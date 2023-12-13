import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseSDK.js";

export const DocumentDetail = () => {
  const { docId } = useParams();
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Notes", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocumentData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [docId]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      {documentData ? (
        <>
          <h2>{documentData.title}</h2>
          <div className="data-container">
            <label>Procedure Code:</label>
            <div className="data-item">{documentData.procedureCode}</div>
            <button
              onClick={() => copyToClipboard(documentData.procedureCode)}
            >
              Copy
            </button>
          </div>
          <div className="data-container">
            <label>Note Template:</label>
            <div className="data-item">{documentData.content}</div>
            <button onClick={() => copyToClipboard(documentData.content)}>
              Copy
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
