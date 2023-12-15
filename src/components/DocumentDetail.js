import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseSDK.js";
import "./DocumentDetail.css";

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
    const copiedText = `CPT${text}`;
    navigator.clipboard.writeText(copiedText);
  };

  return (
    <div className="page-container">
      <div className="container">
        {documentData ? (
          <>
          <p className="user">{documentData.userName}</p>
            <h2 className="header-title">{documentData.title}</h2>
            <div className="data-container">
              <label>Procedure CPT Code: {documentData.procedureCode}</label>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(documentData.procedureCode)}
              >
                Copy
              </button>
            </div>
            <div className="data-container">
              <div className="data-item">{documentData.content}</div>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(documentData.content)}
              >
                Copy
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
