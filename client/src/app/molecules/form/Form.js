"use client";
import "./Form.css";
import Input from "@/app/components/atoms/Input/Input";
import Title from "@/app/components/atoms/Title/Title";
import Container from "@/app/components/atoms/Container/Container";
import Button from "@/app/components/atoms/Button/Button";
import { useEffect, useState } from "react";

function Form({ setTasks, refreshTable, refreshChart }) {
  const [taskID, setTaskID] = useState("");
  const [taskName, setTaskName] = useState("");
  const [duration, setDuration] = useState("");
  const [localDependencies, setLocalDependencies] = useState([]);
  const [ganttData, setGanttData] = useState(null);
  const [dependencies, setDependencies] = useState([]);
  const [error, setError] = useState("");

  const fetchGanttData = () => {
    fetch("http://localhost:8000/gantt")
      .then((response) => response.json())
      .then((data) => {
        setGanttData(data);
        setTasks(data.tasks || []);
        setDependencies(data.dependencies || []);
      })
      .catch((error) => console.error("Błąd pobierania danych:", error));
  };

  useEffect(() => {
    fetchGanttData();
  }, []);

  const updateTasksOnServer = (updatedTasks, updatedDependencies) => {
    fetch("http://localhost:8000/gantt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: updatedTasks.map((task) => ({
          ...task,
          dependencies: updatedDependencies
            .filter((dep) => dep.to === task.id)
            .map((dep) => dep.from),
        })),
        dependencies: updatedDependencies,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGanttData(data);
        refreshTable();
        refreshChart();
      })
      .catch((error) => console.error("Error updating tasks:", error));
  };

  const addTask = () => {
    if (!taskID.trim() || !taskName.trim() || !duration.trim()) {
      setError("Proszę uzupełnić wszystkie wymagane pola (ID, Name, Duration).");
      return;
    }

    const parsedDuration = parseInt(duration, 10);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      setError("Duration musi być dodatnią liczbą całkowitą.");
      return;
    }

    const existingTasks = (ganttData?.tasks || []).map((task) => task.id);
    for (const dep of localDependencies) {
      const depID = dep.to.trim();
      if (!existingTasks.includes(depID)) {
        setError(
          `Nie można ustawić "${depID}" jako zależności, ponieważ zadanie "${depID}" nie istnieje. Proszę je najpierw dodać.`
        );
        return;
      }
    }


    setError("");

    const newTask = {
      id: taskID,
      name: taskName,
      duration: parsedDuration,
      earliest_start: 0,
      earliest_finish: 0,
      latest_start: 0,
      latest_finish: 0,
      critical: false,
    };


    const newDependencyObjects = localDependencies.map((dep) => ({
      from: taskID,
      to: dep.to.trim(),
    }));

    const updatedTasks = [...(ganttData?.tasks || []), newTask];
    const updatedDependencies = [...dependencies, ...newDependencyObjects];


    setGanttData({
      tasks: updatedTasks,
      dependencies: updatedDependencies,
    });
    setTasks(updatedTasks);
    setDependencies(updatedDependencies);
    updateTasksOnServer(updatedTasks, updatedDependencies);


    setTaskID("");
    setTaskName("");
    setDuration("");
    setLocalDependencies([]);
  };

  const reset = () => {
    setTaskID("");
    setTaskName("");
    setDuration("");
    setLocalDependencies([]);
    setTasks([]);
    setDependencies([]);
    setError("");

    fetch("http://localhost:8000/gantt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: [], dependencies: [] }),
    })
      .then(() => {
        setGanttData({ tasks: [], dependencies: [] });
        refreshTable();
        refreshChart();
      })
      .catch((error) => console.error("Błąd resetowania danych:", error));
  };

  return (
    <div className="form">
      <Title title="Critical Path Method Calculator" variant="small" />

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <Input
        type="text"
        label="Task ID:"
        placeholder="A"
        value={taskID}
        onChange={(e) => setTaskID(e.target.value)}
      />
      <Input
        type="text"
        label="Task Name:"
        placeholder="Task A"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Input
        type="number"
        label="Duration (days):"
        placeholder="3"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <Input
        type="text"
        label="Dependencies (comma-separated IDs):"
        placeholder="B,C"
        value={localDependencies.map((dep) => dep.to).join(", ")}
        onChange={(e) => {
          const updatedDeps = e.target.value
            .split(",")
            .map((dep) => ({ from: taskID, to: dep.trim() }))
            .filter((dep) => dep.to !== "");
          setLocalDependencies(updatedDeps);
        }}
      />

      <Container variant="row">
        <Button onClick={addTask} text="Add Task" variant="default" />
        <Button onClick={reset} text="Reset" variant="glass" />
      </Container>
    </div>
  );
}

export default Form;
