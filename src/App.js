import './App.css';
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import {useState} from 'react'


function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Csilla\'s birthday',
            day: 'Dec 6th at 12:00pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Lunch',
            day: 'Dec 610th at 13:00pm',
            reminder: true,
        },
        {
            id: 3,
            text: 'Food shopping',
            day: 'Dec 17th at 16:00pm',
            reminder: false,
        }
    ])

    // Add task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1

        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }

    //Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => (task.id !== id)))
    }

    // Toggle Reminder
    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task))
    }

    return (
        <>
            <div className="container">
                <Header />
                <AddTask onAdd={addTask} />
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            </div>
        </>

    );
}

export default App;
