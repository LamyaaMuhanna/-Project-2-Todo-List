import React, {useState} from "react";



export default function Add(props) {
  const [newTitle, setNewTitle] = useState('')

  const createNewTodo = ()=>{
    props.createFunc({title: newTitle, 
    isCompleted:false})
  }
  return (
    <div className="Add">
      <input
      type="text" placeholder="Enter new task here"
      onChange={(e)=>{
          setNewTitle(e.target.value)
      }}/>
      <button onClick={createNewTodo}>Add</button>
    </div>
  )
}
