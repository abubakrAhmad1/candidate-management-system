import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Skill from "./Skill";

export default function Home() {
  const [image, setImage] = useState(null);//remain same
  const [skills, setSkills] = useState([]);//remain same
  const [addSkill, setAddSkill] = useState(false);//remain same
  const inputRef = useRef(null);//remain same

  const changeFunc = (text) => {
    let arr = [...skills];
    arr.push(text);
    setSkills(arr);
  };

  const removeFunc = (text) => {
    let arr = [...skills];
    arr = arr.filter((skill) => skill != text);
    setSkills(arr);
  };
// this will remain same
  const addNewSKill = () => {
    let arr = [...skills];
    arr.push(inputRef.current.value);
    setSkills(arr);
    setAddSkill(false);
  };
//this will alse remain same
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form>
      <fieldset>
        <legend>Add New Candidate</legend>

        {/* CANDIDATE NAME */}
        <div className="candidateName">
          <label for="name">Caniddate Name</label>
          <input type="text" id="name" required></input>
        </div>

        {/* POSITON APPLIED FOR */}
        <div className="candidatePosition">
          <label for="position">Applied For : </label>
          <select id="position" required>
            <option selected>Select Position</option>
            <option value="frontEnd">Front End Developer</option>
            <option value="backEnd">Back End Developer</option>
            <option value="DataScience">Data Science</option>
          </select>
        </div>

        {/* PROFILE PICTURE */}
        <div className="CandidatePicture">
          <input type="file" accept="image/*" onChange={handleImageChange}  required/>
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
              <img
                src={image}
                alt="Preview"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            ) : (
              <span style={{ color: "#aaa" }}>No Image</span>
            )}
          </div>
        </div>

        {/* ADD SKILLS */}
        <button onClick={() => setAddSkill(true)}>Add Skill</button>

        {addSkill ? (
          <div>
            <input type="text" ref={inputRef} required />
            <button onClick={addNewSKill}> OK </button>
          </div>
        ) : (
          <div></div>
        )}

        {skills.map((skill, index) => (
          <Skill msg={skill} removeFunc={removeFunc} />
        ))}

        {/* SUBMIT BUTTON */}
        <button type="submit">SUBMIT</button>
      </fieldset>
    </form>
  );
}
