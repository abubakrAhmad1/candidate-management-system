import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { storeData } from "../redux/slices/DataSlice";
import Skill from "./Skill";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [skills, setSkills] = useState([]);
  const [addSkill, setAddSkill] = useState(false);
  const inputRef = useRef(null);
  const nameRef = useRef(null);
  const positionRef = useRef(null);
  const dispatch = useDispatch();
  const API_KEY = "95991b741326b9f9fd69c57b3f2fbcdb";

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
      inputRef.current.value = "";
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Upload to ImgBB
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${API_KEY}`,
          formData
        );
        setImageUrl(response.data.data.url);
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const studentData = {
      name: nameRef.current.value,
      position: positionRef.current.value,
      skills: skills,
      image: imageUrl || image,
    };
    dispatch(storeData(studentData));
    nameRef.current.value = "";
    positionRef.current.value = "Select Position";
    setSkills([]);
    setImage(null);
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Candidate</legend>
        <div className="candidateName">
          <label htmlFor="name">Candidate Name</label>
          <input type="text" id="name" ref={nameRef} required />
        </div>
        <div className="candidatePosition">
          <label htmlFor="position">Applied For:</label>
          <select id="position" ref={positionRef} required>
            <option value="Select Position">Select Position</option>
            <option value="Front End Developer">Front End Developer</option>
            <option value="Back End Developer">Back End Developer</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
        <div className="CandidatePicture">
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          <div style={{ width: "200px", height: "200px", marginTop: "10px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {imageUrl ? (
              <img src={imageUrl} alt="Uploaded" style={{ maxHeight: "100%", maxWidth: "100%" }} />
            ) : image ? (
              <img src={image} alt="Preview" style={{ maxHeight: "100%", maxWidth: "100%" }} />
            ) : (
              <span style={{ color: "#aaa" }}>No Image</span>
            )}
          </div>
        </div>
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
        <button type="submit">SUBMIT</button>
      </fieldset>
    </form>
  );
}
