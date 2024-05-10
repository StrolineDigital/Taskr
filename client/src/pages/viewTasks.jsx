import { useState } from 'react';
import AddTask from './addTask';
import Tasks from './tasks';

function ViewTasks() {
    const [view, setView] = useState('tasks');// You arent saving any data 

    return (
        <div>
            <button onClick={() => setView('tasks')}>View Tasks</button>
            <button onClick={() => setView('addTask')}>Add Task</button>
            {view === 'tasks' && <Tasks />}
            {view === 'addTask' && <AddTask />}
        </div>
    );
}
   
    export default ViewTasks;