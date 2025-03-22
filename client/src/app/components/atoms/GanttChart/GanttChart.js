"use client";
import React, {useEffect, useState} from 'react';
import ReactGantt from 'gantt-for-react';
import "./GanttChart.css";

 const GanttChart = ({setTasks, refreshChartTrigger}) => {
  const [viewMode, setViewMode] = React.useState("Day");
  const [scrollOffsets, setScrollOffsets] = React.useState(0);
   const [ganttData, setGanttData] = useState(null);

   const fetchGanttData = () => {
        fetch("http://localhost:8000/gantt")
            .then(response => response.json())
            .then(data => {
                console.log("📡 Pobranie danych z serwera:", data);
                setGanttData(data);
                if (data && data.tasks) {
                    setTasks(data.tasks);
                } else {
                    setTasks([]);
                }
            })
            .catch(error => console.error("Błąd pobierania danych:", error));
    };

   useEffect(() => {
        fetchGanttData();
    }, [refreshChartTrigger]);

  if (!ganttData) {
    return <p>Ładowanie danych...</p>;
  }

    const tasks = ganttData.tasks.length > 0 ? ganttData.tasks : [{
    id: "X",
    name: "Brak zadań",
    earliest_start: 0,
    duration: 1
  }];

  return (
    <ReactGantt
      tasks={tasks
        .sort((a, b) => a.earliest_start - b.earliest_start)
        .map((task) => {
          const startDate = new Date();
          startDate.setDate(startDate.getDate() + task.earliest_start);
          startDate.setHours(8, 0, 0, 0);

          const endDate = new Date(startDate);
          endDate.setHours(startDate.getHours() + task.duration);

          return {
            id: task.id,
            name: task.name,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            progress: task.id === "X" ? 0 : Math.floor(Math.random() * 100),
          };
        })}
      viewMode={viewMode}
      scrollOffsets={scrollOffsets}
    />
  );
};

 export default GanttChart;