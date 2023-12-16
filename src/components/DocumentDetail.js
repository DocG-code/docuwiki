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
    <div className="mt-8 flex flex-col w-full justify-items-start items-center">
      <div className="w-3/4 flex flex-col border-2 shadow-lg just-center">
        {documentData ? (
          <>
          <p className="user">{documentData.userName}</p>
            <h2 className="text-xl text-left pl-8">{documentData.title}</h2>
            <div className="p-8">
              <label>Procedure CPT Code: {documentData.procedureCode}</label>
              <button
                className="btn btn-primary"
                onClick={() => copyToClipboard(documentData.procedureCode)}
              >
                Copy
              </button>
            </div>
            <div className="p-8">
              <div className="mb-4">{documentData.content}</div>
              <button
                className="btn btn-primary"
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
