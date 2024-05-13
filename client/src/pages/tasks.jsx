import React, { useState, useEffect } from 'react';

function Tasks(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks) {
        setTasks(storedTasks);
        
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCompleteTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  const handleRemoveTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.filter(task => task.id !== taskId)
    );
  };

  return (
    <> 
      {tasks.map((task, i) => (
        <div
          className={
            task.isComplete
              ? `tasks-row complete ${task.isComplete}`
              : `tasks-row ${task.isComplete}`
          } 
          key={i}
        >
          <div onClick={() => handleCompleteTask(task.id)}>
            <span className={task.isComplete ? "completed" : ""}>
              {task.text}
            </span>
          </div>
          <div className="icons">
          {console.log(tasks)}
            <p onClick={() => handleCompleteTask(task.id)}>✅</p>
            <p onClick={() => handleRemoveTask(task.id)}>🗑️</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Tasks;