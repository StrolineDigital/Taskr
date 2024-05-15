export const getTasks = () => {
    const savedTasks = localStorage.getItem('saved_tasks')
      ? JSON.parse(localStorage.getItem('saved_tasks'))
      : [];
     return savedTasks;
  };
   export const saveTasks = (tasksArr) => {
    if (tasksArr.length) {
      localStorage.setItem('saved_tasks', JSON.stringify(tasksArr));
    } else {
      localStorage.removeItem('saved_tasks');
    }
  };
   export const deleteTasks = (taskId) => {
    const savedTaskIds = localStorage.getItem('saved_tasks')
      ? JSON.parse(localStorage.getItem('saved_tasks'))
      : null;
     if (!savedTaskIds) {
      return false;
    }
     const updatedSavedTaskIds = savedTaskIds?.filter((savedTaskId) => savedTaskId !== TaskId);
    localStorage.setItem('saved_tasks', JSON.stringify(updatedSavedTaskIds));
     return true;
  }; 