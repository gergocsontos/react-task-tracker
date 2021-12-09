import {useState, useEffect} from 'react'
import {useParams, useNavigate, useLocation} from "react-router-dom"
import Button from "./Button"

function TaskDetails() {
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    const [error, setError] = useState(null)

    const params = useParams()
    const navigate = useNavigate()
    const {pathname} = useLocation()

    useEffect(() => {
        async function fetchTask() {
            const response = await fetch(`/tasks/${params.id}`)
            const data = await response.json()

            if (response.status === 404) {
                setError('Task not found')
            }

            setTask(data)
            setLoading(false)
        }
        fetchTask()
        //cleanup function
        return () => {
            // reverses code in the useEffect block
        }
    }, [params.id])

    if (error) {
        navigate('/')
    }


    return loading ? (
        <h3>Loading...</h3>
    ) : (
        <div>
            <p>{pathname}</p>
            <h3>{task.text}</h3>
            <p>{task.day}</p>
            <Button onClick={() => {
                navigate(-1)
            }} text="Go back" />
        </div>
    )
}

export default TaskDetails