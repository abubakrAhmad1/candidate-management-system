import React from 'react'
import { useSelector } from 'react-redux'


export default function About() {
  const arr = useSelector(state => state.studentData);
  console.log(arr);
  return (
    <div>
      {arr.map(elem => (
        <div>
          <h5>{elem.name}</h5>
          <h5>{elem.position}</h5>
          {elem.skills.map(skill => <div>{skill}</div>)}
        </div>
      ))}
    </div>
  )
}
