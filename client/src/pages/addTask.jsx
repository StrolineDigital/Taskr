import React, { useState } from 'react';
import Tasks from './Tasks'; // Assuming Tasks component is in 'Tasks.js'
import ViewTasks from './viewTasks'; // Assuming ViewTasks component is in 'ViewTasks.js'

function AddTask() {
    const [tasks, setTasks] = useState([]);
    const [item, setItem] = useState({
        id: 0, // starting ID
        text: '',
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
        setItem({ id: item.id + 1, text: '', isComplete: false }); // Incrementing ID for next task
    };

    const addTaskItem = (task) => {
        setTasks([...tasks, task]);
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
    };

    const editTaskItem = (itemId, newValue) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === itemId) {
                return { ...task, text: newValue };
            }
            return task;
        });

        setTasks(updatedTasks);
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
