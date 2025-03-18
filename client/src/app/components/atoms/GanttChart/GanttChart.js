"use client";
import React from 'react';
import ReactGantt from 'gantt-for-react';
import "./GanttChart.css";

 const GanttChart = () => {
  const [viewMode, setViewMode] = React.useState("Day");
  const [scrollOffsets, setScrollOffsets] = React.useState(0);

  const getTasks = () => [
    {
      id: "Task 1",
      name: "Setup project",
      start: "2024-03-10",
      end: "2024-03-15",
      progress: 50,
    },
      {
      id: "Task 2",
      name: "Setup project",
      start: "2024-03-10",
      end: "2024-03-15",
      progress: 50,
    },
  ];

  return (
    <ReactGantt
      tasks={getTasks()}
      viewMode={viewMode}
      scrollOffsets={scrollOffsets}
    />
  );
};

 export default GanttChart;