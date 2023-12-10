import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { firebaseApp } from "../firebaseSDK.js";

export const DocumentDetail = () => {
  const { docId } = useParams();
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
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
          <h2>Docmentation Details</h2>
          <p>Procedure Code: {documentData.procedure_code}</p>
          <button onClick={() => copyToClipboard(documentData.procedure_code)}>
            Copy
          </button>
          <p>Diagnosis Code: {documentData.diagnosise_code}</p>
          <button onClick={() => copyToClipboard(documentData.diagnosise_code)}>
            Copy
          </button>
          <p>Note Template: {documentData.note_template}</p>
          <button onClick={() => copyToClipboard(documentData.note_template)}>
            Copy
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
