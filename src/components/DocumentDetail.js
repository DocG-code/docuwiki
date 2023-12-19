import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseSDK.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./DocumentDetail.css";

export const DocumentDetail = () => {
  const { docId } = useParams();
  const [documentData, setDocumentData] = useState(null);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

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

  const handleEdit = () => {
    navigate(`/edit/${docId}`);
  };

  return (
    <div className="mt-8 flex flex-col w-full justify-items-start items-center">
      <div className="w-3/4 flex flex-col border-2 shadow-lg just-center">
        {documentData ? (
          <>
            <p className="user text-right pr-8 pt-2">✏️ {documentData.userName}</p>

            <h2 className="text-2xl text-left pl-8">{documentData.title}</h2>
            <div className="pl-8 pt-8">
              <label>Procedure CPT Code: {documentData.procedureCode}</label>
            </div>
            <div className="p-8 whitespace-pre-wrap">
              <div className="mb-4">{documentData.content}</div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="flex justify-between w-3/4 pt-4">
      <button
        className="btn btn-primary"
        onClick={() => copyToClipboard(documentData.content)}
      >
        Copy
      </button>
      {documentData && user && user.uid === documentData.userId && (
        <button className="btn btn-error" onClick={handleEdit}>
          Edit
        </button>
      )}
      </div>
    </div>
  );
};
