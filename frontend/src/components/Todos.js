import React from "react";


export default function Todos(props) {

  const {_id,title,isCompleted}=props.task
  return (
    <div className="Todos">

      <span style={{textDecoration:isCompleted?
      'line-through':"none"}}>{title}</span>

      <input type="checkbox" defaultChecked={isCompleted} onClick={()=>{
        props.toggleTodo(_id, !isCompleted)
      }}/>
      
      <button  onClick={()=>{
        props.deleteTodo(_id)
      }}>X</button>
      
     
    </div>
  )
}
