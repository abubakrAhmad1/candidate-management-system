import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { storeData } from "../redux/slices/DataSlice";
import Skill from "./Skill";

export default function Home() {
  const [image, setImage] = useState(null);
  const [skills, setSkills] = useState([]);
  const [addSkill, setAddSkill] = useState(false);
  const inputRef = useRef(null);
  const nameRef = useRef(null); // Ref for name input
  const positionRef = useRef(null); // Ref for position select
  const dispatch = useDispatch();

  const changeFunc = (text) => {
    setSkills([...skills, text]);
  };

  const removeFunc = (text) => {
    setSkills(skills.filter((skill) => skill !== text));
  };

  const addNewSkill = () => {
    if (inputRef.current.value.trim() !== "") {
      setSkills([...skills, inputRef.current.value]);
      setAddSkill(false);
      inputRef.current.value = ""; // Clear input after adding
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const studentData = {
      name: nameRef.current.value,
      position: positionRef.current.value,
      skills: skills,
      image: image,
    };

    // Dispatch the data to Redux store
    dispatch(storeData(studentData));

    // Reset form fields after submission
    nameRef.current.value = "";
    positionRef.current.value = "Select Position";
    setSkills([]);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Candidate</legend>

        {/* CANDIDATE NAME */}
        <div className="candidateName">
          <label htmlFor="name">Candidate Name</label>
          <input type="text" id="name" ref={nameRef} required />
        </div>

        {/* POSITION APPLIED FOR */}
        <div className="candidatePosition">
          <label htmlFor="position">Applied For:</label>
          <select id="position" ref={positionRef} required>
            <option value="Select Position">Select Position</option>
            <option value="Front End Developer">Front End Developer</option>
            <option value="Back End Developer">Back End Developer</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        {/* PROFILE PICTURE */}
        <div className="CandidatePicture">
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          <div
            style={{
              width: "200px",
              height: "200px",
              marginTop: "10px",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {image ? (
              <img src={image} alt="Preview" style={{ maxHeight: "100%", maxWidth: "100%" }} />
            ) : (
              <span style={{ color: "#aaa" }}>No Image</span>
            )}
          </div>
        </div>

        {/* ADD SKILLS */}
        <button type="button" onClick={() => setAddSkill(true)}>Add Skill</button>

        {addSkill && (
          <div>
            <input type="text" ref={inputRef} required />
            <button type="button" onClick={addNewSkill}>OK</button>
          </div>
        )}

        {skills.map((skill, index) => (
          <Skill key={index} msg={skill} removeFunc={removeFunc} />
        ))}

        {/* SUBMIT BUTTON */}
        <button type="submit">SUBMIT</button>
      </fieldset>
    </form>
  );
}
