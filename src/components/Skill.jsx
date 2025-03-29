import '../styles/skill.css'

export default function Skill({msg , removeFunc}) {
    
  return (
    <div className='skill'>
        <div>{msg}</div>
        <button onClick={()=>removeFunc(msg)}>Remove</button>
    </div>
  )
}
