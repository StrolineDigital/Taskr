import { useState, useEffect } from 'react';
// import AddTask from './addTask';
//This function will allow users to view their tasks
function Tasks(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    isComplete: '',
  });
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        setTasks(tasks);
      }
    }
    catch (error) {
      console.log(error);
    }
  }, []); //This function will allow users to view their tasks


//logs the tasks entered by user
  //console.log(props.tasks);
//This function will allow users to submit an update to a task
  //const submitUpdate = (value) => {
    //props.editTasksItem(edit.id, value); ///DOES NOTHING
    //setEdit({ id: null, value: '', isComplete: '' });
  //};
/*
  if (edit.id) {
    return <AddTask edit={edit} onSubmit={submitUpdate} />;
  }*/
//renders the tasks entered by the user
  return (
    <> 
   { tasks.map((item, i) => (
    <div
      className={
        item.isComplete
          ? `tasks-row complete ${item.isComplete}`
          : `tasks-row ${item.isComplete}`
      } 
      key={i}
    >
      <div key={item.id} onClick={() => props.completeTasksItem(item.id)}>
        {item.text}
      </div>
      <div className="icons">
        {console.log(item)}
        <p onClick={() => setEdit({ id: item.id, value: item.text, isComplete: item.isComplete })}> ✏️</p>
        <p onClick={() => props.removeTasksItem(item.id)}> 🗑️</p>
      </div>
    </div>
  ))}
  </>
)}

export default Tasks;
