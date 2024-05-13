
import { useState, useEffect } from "react";
import Tasks from "./tasks";

function AddTask() {
  const [tasks, setTasks] = useState([]);
  const [item, setItem] = useState({
    id: 0,
    text: "",
    isComplete: false,
  });

  const handleChange = (e) => {
    setItem({ ...item, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.text) {
      return;
    }

    addTaskItem(item);
    setItem({ id: item.id + 1, text: "", isComplete: false });
  };

  const addTaskItem = (task) => {
    setTasks([...tasks, task]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
  };

  const completeTaskItem = (id) => {
    let updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });

    setTasks(updatedTask);
  };

  const removeTaskItem = (id) => {
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
  };

  const editTaskItem = (itemId, newValue) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === itemId) {
        return { ...task, text: newValue };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

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
