"use client";
import "./Form.css";
import Input from "@/app/components/atoms/Input/Input";
import Title from "@/app/components/atoms/Title/Title";
import Container from "@/app/components/atoms/Container/Container";
import Button from "@/app/components/atoms/Button/Button";
import {useEffect, useState} from "react";


function Form() {
    const [tasks, setTasks] = useState([]);
    const [taskID, setTaskID] = useState("");
    const [taskName, setTaskName] = useState("");
    const [duration, setDuration] = useState("");
    const [dependencies, setDependencies] = useState("");
    const [ganttData, setGanttData] = useState(null);

    const updateTasksOnServer = (newTasks) => {
        fetch("http://localhost:8000/gantt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tasks: newTasks }),
        })
        .then(response => response.json())
        .then(data => console.log("Tasks updated:", data))
        .catch(error => console.error("Error updating tasks:", error));
    };


    useEffect(() => {
        fetch("http://localhost:8000/gantt")
            .then(response => response.json())
            .then(data => setGanttData(data))
            .catch(error => console.error("Error fetching Gantt data:", error));
    }, [tasks]);  //

    const addTask = () => {

        const newTask = {
            id: taskID,
            name: taskName,
            duration: duration ? parseInt(duration) : 0,
            dependencies: dependencies ? dependencies.split(",").map(dep => dep.trim()) : []
        };

        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        updateTasksOnServer(newTasks);
        setTaskID("");
        setTaskName("");
        setDuration("");
        setDependencies("");
    };

    const reset = () => {
        setTaskID("");
        setTaskName("");
        setDuration("");
        setDependencies("");
        setGanttData(null);
    };

    return (
        <div className="form">
            <Title title="Critical Path Method Calculator" variant="small" />

            <Input
                type="text"
                label="Task ID:"
                placeholder="A"
                value={taskID || ""}
                onChange={(e) => setTaskID(e.target.value)}
            />
            <Input
                type="text"
                label="Task Name:"
                placeholder="Task A"
                value={taskName || ""}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <Input
                type="number"
                label="Duration (days):"
                placeholder="3"
                value={duration || ""}
                onChange={(e) => setDuration(e.target.value)}
            />
            <Input
                type="text"
                label="Dependencies (comma-separated IDs):"
                placeholder="B,C"
                value={dependencies || ""}
                onChange={(e) => setDependencies(e.target.value)}
            />

            <Container variant="row">
                <Button onClick={addTask} text="Add Task" variant="default" />
                <Button onClick={reset} text="Reset" variant="glass" />
            </Container>

            <Button text="Calculate" variant="default" />

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <strong>{task.id}</strong> - {task.name}, {task.duration} days
                        {task.dependencies.length > 0 && ` (Depends on: ${task.dependencies.join(", ")})`}
                    </li>
                ))}
            </ul>

            <h3>CPM Results:</h3>
            {ganttData ? (
                <pre>{JSON.stringify(ganttData, null, 2)}</pre>
            ) : (
                <p>No Gantt data yet...</p>
            )}
        </div>
    );
}

export default Form;