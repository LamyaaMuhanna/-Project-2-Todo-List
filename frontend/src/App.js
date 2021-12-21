import React, {useEffect, useState} from "react";
//import "./App.css";
import axios from 'axios'
import Todos from "./components/Todos";

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    getData()
  },[])

  const getData= ()=>{
    axios
      .get('http://localhost:5000/todos')
      .then((response)=>{
        setTasks(response.data)
      })
      .catch((err)=>{
        console.log('ERR: ', err)
      })
  }
  
  
  const mapOverTasks = tasks.map((taskObj,i)=> <Todos
  key={i} task={taskObj}/>)

  return (
    <div className="App">
      <button onClick={getData}>GET TASKS</button>
      {mapOverTasks}
      
      
      
    </div>
  );
}
