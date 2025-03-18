"use client";
import React, {useEffect, useState} from 'react';
import ReactGantt from 'gantt-for-react';
import "./GanttChart.css";

 const GanttChart = ({setTasks}) => {
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
    }, []);

  if (!ganttData) {
    return <p>Ładowanie danych...</p>;
  }

  return (
   <ReactGantt
    tasks={ganttData.tasks
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
          progress: Math.floor(Math.random() * 100),
        };
      })}
    viewMode={viewMode}
    scrollOffsets={scrollOffsets}
  />
  );
};

 export default GanttChart;