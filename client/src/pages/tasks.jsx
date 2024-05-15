import { useState, useEffect } from 'react';


import { useMutation, useQuery } from '@apollo/client';
import { DELETE_TASK, UPDATE_TASK } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import { getTasks, deleteTasks, saveTasks } from '../utils/localStorage';


// import AddTask from './addTask';
//This function will allow users to view their tasks
function Tasks() {
const [deleteTask] = useMutation(DELETE_TASK);
const [updateTask] = useMutation(UPDATE_TASK);
const { loading, data, error } = useQuery(QUERY_USER);
console.log(data);
const userData = data?.me || {};
if (error) {
  console.log(error);
 }






 console.log("the data", userData);


 const [edit, setEdit] = useState({
   id: null,
   value: '',
 
 });
 const [editToggle, setEditToggle] = useState(false);


 useEffect(() => {
   try {
     getTasks();
    
   }
   catch (error) {
     console.log(error);
   }
 }, []); //This function will allow users to view their tasks


const deleteSubmit = async (id) => {
 console.log("Checking id", id);
 try {
   await deleteTask({
     variables: {
       taskId: id,
     },
   });
   deleteTasks(id);
 } catch (error) {
   console.log(error);
 }
}


 const updateSubmit = async (id) => {
 
   setEditToggle(true);
   setEdit({ id: id, value: edit.value });
   try {
     await updateTask({
       variables: {
         taskId: id,
         taskdata: {
           text: edit.value,
         },
       },
     });
   } catch (error) {
     console.log(error);
   }
   setEdit({
     id: null,
     value: '',
   
   });
 }


 const completeSubmit = async (id) => {
   try {
     await updateTask({
       variables: {
         taskId: id,
         taskdata: {
           isComplete: true,
         },
       },
     });
     setEdit({
       id: null,
       isComplete: true,
     });
     saveTasks(edit);
   } catch (error) {
     console.log(error);
   }
 }


 if (!userData || !userData.tasks) {
   return <div>Loading tasks...</div>; // You can customize this message or add a spinner
 }


 return (
  
   <>
   { userData && userData.tasks.map((item) => (
   <div
     className={
       item.isComplete
         ? `tasks-row complete ${item.isComplete}`
         : `tasks-row ${item.isComplete}`
     }
     key={item._id}
   >
     { editToggle ? (
       <input
         type="text"
         placeholder="Update your task"
         value={edit.value}
         onChange={(e) => setEdit({ ...edit, value: e.target.value })}
       />
     ) : (
       <div key={item._id} onClick={() => completeSubmit(item._id)}>
         {item.text}
       </div>
     )}
     <div className="icons">
     
       <p onClick={() => updateSubmit(item._id)}> ✏️</p>
       <p onClick={() => deleteSubmit(item._id)}> 🗑️</p>
     </div>
     </div>
  ))} 
</>
 )}


export default Tasks;