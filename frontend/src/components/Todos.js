import React from "react";



export default function Todos(props) {

  const {_id,title,isCompleted}=props.task
  return (
    <div className="Todos">
      <p>TITLE: {title}</p>

      
      
    </div>
  )
}
