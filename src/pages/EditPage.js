import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseSDK.js";
import { useAuthState } from "react-firebase-hooks/auth";
import TextareaAutosize from "react-textarea-autosize";

function Edit() {
  const [title, setTitle] = useState("");
  const [procedureCode, setProcedureCode] = useState("");
  const [content, setContent] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const { docId } = useParams();
  const navigate = useNavigate();
  const docRef = doc(db, "Notes", docId);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) navigate("/Login");
  }, [user, loading]);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTitle(docSnap.data().title);
          setProcedureCode(docSnap.data().procedureCode);
          setContent(docSnap.data().content);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    console.log("Fetching document with docId:", docId); // Log the docId
    fetchDoc();
  }, [docId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log("Before update:", procedureCode, content);
    await updateDoc(docRef, {
      title: title,
      procedureCode: procedureCode,
      content: content,
      uid: user.uid,
    });
    console.log("After update:", title, procedureCode, content);
  };

  return (
    <div className="mt-8 flex flex-col w-full justify-start items-center">
      <div className="flex-col w-3/4">
        <div>
          <h2 className="text-black text-xl">Edit your note template</h2>
          <h2 className="warning">
            DO NOT enter patient information. This is only a note template.
          </h2>
        </div>
        <div className="flex justify-center">
          <form className="w-full my-12" onSubmit={handleUpdate}>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                placeholder="Template title"
                className="input input-bordered w-full"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">CPT code</span>
              </div>
              <input
                placeholder="Numbers only"
                className="input input-bordered w-full"
                type="text"
                value={procedureCode}
                onChange={(e) => setProcedureCode(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Note template</span>
              </div>
              <TextareaAutosize
                minRows={5}
                placeholder="Numbers only"
                className="textarea textarea-bordered textarea-lg"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
