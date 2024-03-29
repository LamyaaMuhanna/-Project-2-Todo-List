import React, {useEffect, useState} from "react";
import "./App.css";
import axios from 'axios'
import Todos from "./components/Todos";
import Add from "./components/Add"

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    getData()
  },[])
//to get data from server
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
  //to add new todo
  const postNewTodo = (body)=>{
    axios
      .post('http://localhost:5000/todos',body)
      .then((response)=>{
        setTasks(response.data)
        getData()
      })
      .catch((err)=>{
        console.log('ERR: ', err)
      })
  }

  //to delete Todo
  const deleteTodo = (id)=>{
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then((response)=>{
        setTasks(response.data)
        getData()
      })
      .catch((err)=>{
        console.log('ERR: ', err)
      })
  }

  //to edit the todos
  const toggleTodo = (id, newStatus)=>{
    axios
      .put(`http://localhost:5000/todos/${id}/${newStatus}`)
      .then((response)=>{
        getData()
      })
      .catch((err)=>{
        console.log('ERR: ', err)
      })
  }

  //for delete all tasks
  const deleteTasks = ()=>{
    axios
      .delete(`http://localhost:5000/todos`)
      .then((response)=>{
        getData()
      })
      .catch((err)=>{
        console.log('ERR: ', err)
      })
  }

  //filter
  const filterData= (status)=>{
    axios
      .get(`http://localhost:5000/filter?isCompleted=${status}`)
      .then((response)=>{
        setTasks(response.data)
      })
      .catch((err)=>{
        console.log('ERR: ', err)
      })
  }

  const mapOverTasks = tasks.map((taskObj,i)=> <Todos
  key={i} task={taskObj} deleteTodo={deleteTodo}
  toggleTodo={toggleTodo}/>)

  return (
    <div className="App">    
      
      <div>
        <h1>To do List</h1><br></br>
        <Add createFunc={postNewTodo} />
      </div><br></br> 
      <div>
        {mapOverTasks}
      </div>
      <div>
      <button onClick={getData}>GET TASKS</button>
      <button onClick={deleteTasks}>DELETE COMPLETED</button><br></br>
      <button onClick={()=>{
        filterData(true)
      }}>DONNE</button>
      <button onClick={()=>{
        filterData(false)
      }}>PENDING</button>
      </div>

    </div>
  );
}
