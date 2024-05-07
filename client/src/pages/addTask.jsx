import { useState } from 'react';
import Tasks from './tasks';
import ViewTasks from './viewTasks';

const [task, setTask] = useState([]);

function AddTask() {
    const [item, setItem] = useState({
        id: null,
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
        setItem({ text: '' });
    };

    return (
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
    );
}
const [tasks, setTasks] = useState([]);

const newTask = [item, ...tasks];
console.log(newTask);


setTask(newTask);


const completeTaskItem = (id) => {
 
let updatedTask = task.map((item) => {
    if (item.id === id) {
        item.isComplete = !item.isComplete;
    }
    return item;
});

console.log(updatedTask);
setTask(updatedTask);
}; 


const removeTasktItem = (id) => {
const updatedTask = [...task].filter((item) => item.id !== id);

setTask(updatedTask);
};


const editTaskItem = (itemId, newValue) => { 
if (!newValue.text) {
    return;
}}; 


export default AddTask; 