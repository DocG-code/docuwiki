import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseSDK.js";
import {
  doc,
  query,
  where,
  collection,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Login } from "../components/Login.js";

export const My_Templates = () => {
  const [user, loading, error] = useAuthState(auth);
  const [documentData, setDocumentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const userId = user.uid;
      console.log(userId);
      const q = query(collection(db, "Notes"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setDocumentData(docs);
      console.log(docs);
    };

    fetchData();
  }, [user]); // re-run fetchData when `user` changes

  const handleCardClick = (id) => {
    navigate(`/document/${id}`);
  };

  return (
    <div className="">
      {!!user ? (
        <div className="mt-8 flex flex-col items-center justify-start">
          <div className="flex-col w-full">
            <h2 className="text-xl">My templates</h2>
            {documentData &&
              documentData.map((doc) => (
                <div
                  className="border border-base-300 bg-base-200 p-3 m-3 hover:cursor-pointer hover:bg-accent"
                  key={doc.id}
                  onClick={() => handleCardClick(doc.id)}
                >
                  <h3>{doc.title}</h3>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};
