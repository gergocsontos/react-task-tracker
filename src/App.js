import './App.css';
import Header from "./components/Header"
import Tasks from "./components/Tasks"
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
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            </div>
        </>

    );
}

export default App;
