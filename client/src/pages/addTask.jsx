//This file is used to add tasks to the list and display them. It also allows the user to edit and delete tasks.
import { useState } from "react";
import Tasks from "./tasks";
import ViewTasks from "./viewTasks";

//The AddTask function assigns an ID to each task and sets the initial state of the task to not complete.
function AddTask() {
  const [tasks, setTasks] = useState([]);
  const [item, setItem] = useState({
    id: 0, // starting ID
    text: "",
    isComplete: false,
  });

  //The handleChange function updates the state of the task item when the user types in the input field.
  const handleChange = (e) => {
    setItem({ ...item, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.text) {
      return;
    }

    addTaskItem(item);
    setItem({ id: item.id + 1, text: "", isComplete: false }); // Incrementing ID for next task
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
  };

  // This function adds a task item to the list of tasks.
  const addTaskItem = (task) => {
    setTasks([...tasks, task]);
  };

  // This function marks a task item as complete or incomplete.
  const completeTaskItem = (id) => {
    let updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });

    setTasks(updatedTask);
  };
//This function removes a task item from the list of tasks.
  const removeTaskItem = (id) => {
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  };
//This function edits a task item in the list of tasks.
  const editTaskItem = (itemId, newValue) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === itemId) {
        return { ...task, text: newValue };
      }
      return task;
    });

    setTasks(updatedTasks);
  };
//This returns the form for adding a task and the list of tasks.
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
      <Tasks
        tasks={tasks}
        completeTaskItem={completeTaskItem}
        removeTaskItem={removeTaskItem}
        editTaskItem={editTaskItem}
      />
    </div>
  );
}

export default AddTask;
