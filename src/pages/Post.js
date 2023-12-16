import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseSDK.js";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const Template_Post = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [procedureCode, setProcedureCode] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("Submit");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const docData = {
      title,
      procedureCode,
      content,
      userId: user.uid,
    };

    try {
      await addDoc(collection(db, "Notes"), docData);
      console.log("Document written with ID: ", docData.title);
      setTitle("");
      setProcedureCode("");
      setContent("");
      setButtonText("Template submitted");
      setTimeout(() => setButtonText("Submit"), 2000); // Reset button text after 2 seconds
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) navigate("/Login");
  }, [user, loading]);
  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-black text-xl">Create a new template</h2>
        <h2 className="warning">
          DO NOT enter patient information. This is only a note template.
        </h2>
      </div>
      <div className="flex justify-center">
        <form className="w-full my-12" onSubmit={handleSubmit}>
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
            <textarea
              className="textarea textarea-bordered textarea-lg"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your note template here"
            />
          </label>
          <button className="btn btn-primary" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
