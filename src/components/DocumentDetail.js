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
          <h2>{docId}</h2>
          <div className="data-container">
            <label>Procedure Code:</label>
            <div className="data-item">{documentData.procedure_code}</div>
            <button
              onClick={() => copyToClipboard(documentData.procedure_code)}
            >
              Copy
            </button>
          </div>
          <div className="data-container">
            <label>Diagnosis Code(s):</label>
            <div className="data-item">{documentData.diagnosis_code}</div>
            <button
              onClick={() => copyToClipboard(documentData.diagnosise_code)}
            >
              Copy
            </button>
          </div>
          <div className="data-container">
            <label>Note Template:</label>
            <div className="data-item">{documentData.note_template}</div>
            <button onClick={() => copyToClipboard(documentData.note_template)}>
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
