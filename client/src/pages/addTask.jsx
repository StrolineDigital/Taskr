import { useState, useEffect } from "react";
import Tasks from "./tasks";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../utils/mutations";
import { saveTasks } from "../utils/localStorage";
import { redirect } from "react-router-dom";


function AddTask() {
 const [addTask] = useMutation(ADD_TASK);


 const [item, setItem] = useState({
   id: 0,
   text: "",
   isComplete: false,
 });


 const handleChange = (e) => {
   setItem({ ...item, text: e.target.value });
 };


 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!item.text) {
     return;
   }
   try {


    const data = await addTask({
       variables: {
         taskdata: {
           text: item.text,
           isComplete: item.isComplete,
         },
       },
     });
     console.log("checking the data", data);
  
    
     saveTasks(item.id, item);
   setItem({ id: item.id + 1, text: "", isComplete: false });
 } catch (error) {
   console.log(error);
 }
 };




 return (
   <div>
     <form onSubmit={handleSubmit}>
       <input
         type="text"
         placeholder="Add a task"
         value={item.text}
         name="text"
         onChange={handleChange}
       />
       <button type="submit">Add Task</button>
     </form>
    
   </div>
 );
}


export default AddTask;