import {useEffect,useState} from "react";
import axios from "axios";
import React from 'react'

const App = () => {

  const[name,setName]=useState("");
  const[course,setCourse]=useState("");
  const[students,setStudents]=useState([]);
  //get
  const getStudents=async()=>{
    const res=await axios.get("https://srimathibackend-1.onrender.com/students");
    setStudents(res.data);//tracking 
  };
  //post data
  const addStudent=async ()=>{
    await axios.post("https://srimathibackend-1.onrender.com/add",{
      name,course
    });//to connect or post in backend
    getStudents();
    setName("");//removing values
    setCourse("");//removing values
  }
  //delete data
  const deleteStudent=async(id) => {
    await axios.delete(`https://srimathibackend-1.onrender.com/delete/${id}`);//delete data in backend
    getStudents();//showing after deletion
  }
  useEffect(()=>{
    getStudents();
  },[]);//it automatically rerent the page and data
  return (
    <>
    <h1>Frontend ↔ Backend </h1>
    <label>Name:</label>
    <input placeholder="enter name"
    value={name}
    onChange={(e)=> setName(e.target.value)}/><br/><br/>
    <label>Course:</label>
    <input placeholder="enter course"
    value={course}
    onChange={(e)=> setCourse(e.target.value)}/><br/><br/>
    <button onClick={addStudent}>Add</button> 
    {students.map(s=>(
      <div key={s._id}>
        {s.name}-{s.course}
        <button onClick={()=> deleteStudent(s._id)}>Delete</button>
      </div>
    ))}
    </>
  )
}

export default App
