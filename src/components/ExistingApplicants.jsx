import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function About() {
  const arr = useSelector((state) => state.studentData);
  const [candid, setCandid] = useState(arr);

  console.log(arr);

  const showRelatedApplicants = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    if (searchTerm === "") {
      setCandid(arr);
    } else {
      const filtered = arr.filter(
        (singleCandidate) =>
          singleCandidate.name.toLowerCase() === searchTerm ||
          singleCandidate.position.toLowerCase() === searchTerm ||
          singleCandidate.skills.some(
            (singleSkill) => singleSkill.toLowerCase() === searchTerm
          )
      );
      setCandid(filtered);
    }
  };

  return (
    <div>
      <input type="search" placeholder="Search..." onChange={showRelatedApplicants}/>

      {candid.map((elem, index) => (
        <div key={index} className="SingleApplicant">
          <h5>Name : {elem.name}</h5>
          <h5>Applied For : {elem.position}</h5>
          <h5>Skills : </h5>
          {elem.skills.map((skill, idx) => (
            <div key={idx}>{skill}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
