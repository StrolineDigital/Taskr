import { useState } from 'react';
import AddTask from './addTask';

function Tasks(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    eagerness: '',
  });

  console.log(props.tasks);

  const submitUpdate = (value) => {
    props.editTasksItem(edit.id, value);
    setEdit({ id: null, value: '', eagerness: '' });
  };
/*
  if (edit.id) {
    return <AddTask edit={edit} onSubmit={submitUpdate} />;
  }*/

  return (
    <> 
   { props.map && props.tasks.map((item, i) => (
    <div
      className={
        item.isComplete
          ? `tasks-row complete ${item.eagerness}`
          : `tasks-row ${item.eagerness}`
      } 
      key={i}
    >
      <div key={item.id} onClick={() => props.completeTasksItem(item.id)}>
        {item.text}
      </div>
      <div className="icons">
        {console.log(item)}
        <p onClick={() => setEdit({ id: item.id, value: item.text, eagerness: item.eagerness })}> ✏️</p>
        <p onClick={() => props.removeTasksItem(item.id)}> 🗑️</p>
      </div>
    </div>
  ))}
  </>
)}

export default Tasks;
