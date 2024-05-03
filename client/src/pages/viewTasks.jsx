import React, { useState } from 'react';
import AddTask from './addTask';
import Tasks from './tasks';

export default function viewTasks() {
   
    const [tasks, setTasks] = useState([]);
   
    // Function to add a bucket list item
    const addTaskItem = (item) => {
    
            item.id = Math.random();
            item.isComplete = false;
            setTasks([...tasks, item]);
    };
        // Check to see if the item text is empty
        if (!item.text) {
            return;
        }

       
        const newTask = [item, ...tasks];
        console.log(newTask);

        // Call setBucket to update state with our new set of bucket list items
        setTask(newTask);
    };

    // Function to mark bucket list item as complete
    const completeTaskItem = (id) => {
        // If the ID passed to this function matches the ID of the item that was clicked, mark it as complete
        let updatedTask = task.map((item) => {
            if (item.id === id) {
                item.isComplete = !item.isComplete;
            }
            return item;
        });

        console.log(updatedTask);
        setTask(updatedTask);
    }; 

    // Function to remove bucket list item and update state
    const removeTasktItem = (id) => {
        const updatedTask = [...task].filter((item) => item.id !== id);

        setTask(updatedTask);
    };

    // Function to edit the bucket list item
    const editTaskItem = (itemId, newValue) => {
        // Make sure that the value isn't empty
        if (!newValue.text) {
            return;
        }

        // We use the "prev" argument provided with the useState hook to map through our list of items
        // We then check to see if the item ID matches the if of the item that was clicked and if so we set it to a new value
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
}

export default viewTasks; 
