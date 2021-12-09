import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"
import TaskDetails from "./components/TaskDetails"

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function getTasks() {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    // Fetch Tasks
    async function fetchTasks() {
        const response = await fetch('/tasks')
        return await response.json()
    }

    // Fetch Task
    async function fetchTask(id) {
        const response = await fetch(`/tasks/${id}`)
        return await response.json()
    }

    // Add task
    async function addTask(task) {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await response.json()
        setTasks([...tasks, data])

        // const id = Math.floor(Math.random() * 10000) + 1
        //
        // const newTask = {id, ...task}
        // setTasks([...tasks, newTask])
    }

    //Delete Task
    async function deleteTask(id) {
        await fetch(`/tasks/${id}`, {
            method: 'DELETE'
        })

        setTasks(tasks.filter((task) => (task.id !== id)))
    }

    // Toggle Reminder
    async function toggleReminder(id) {
        const taskToToggle = await fetchTask(id)
        const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const response = await fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        const data = await response.json()
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
                <Routes>
                    <Route path='/' element={
                        <>
                            {showAddTask && <AddTask onAdd={addTask}/>}
                            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                                : "No tasks to show"}
                        </>
                    }/>
                    <Route path='/about' element={<About />}/>
                    <Route path='/task/:id' element={<TaskDetails />}/>
                </Routes>
                <Footer/>
            </div>
        </Router>

    );
}

export default App;
