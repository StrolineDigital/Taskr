import React, { useState } from 'react';
import AddTask from './addTask';
import Tasks from './tasks';

export default function viewTasks() {
   
    const [tasks, setTasks] = useState([]);
    
   
 setTask((prev) =>
            prev.map((item) => (item.id === itemId ? newValue : item))
        );
    };

    return (
        <div>
            <h1>What is on your task list? </h1>
            <AddTask onSubmit={addTasktItem} />
            <Tasks
                tasks={tasks}
                completeTasktItem={completeTasktItem}
                removeTaskItem={removeTaskItem}
                editTaskItem={editTaskItem}
            ></Tasks>
        </div>
    );

export default viewTasks; 