import React from "react";


export default function Todos(props) {

  const {_id,title,isCompleted}=props.task
  return (
    <div className="Todos">
    
      <p style={{textDecoration:isCompleted?
      'line-through':"none"}}>{title}</p>
      <button  onClick={()=>{
        props.deleteTodo(_id)
      }}>x</button>
      <input type="checkbox" checked={isCompleted} id=""/>

      
      
    </div>
  )
}
