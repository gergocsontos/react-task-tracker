const tasks = [
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
]

const Tasks = () => {
    return (
        <>
            {tasks.map((task) => (
                <h3>{task.text}</h3>
            ))}
        </>
    )
}

export default Tasks