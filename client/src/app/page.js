"use client";
import Navbar from "@/app/molecules/navbar/Navbar";
import Form from "@/app/molecules/form/Form";
import Container from "@/app/components/atoms/Container/Container";
import Chart from "@/app/components/atoms/Chart/Chart";
import {useEffect, useState} from "react";
import GanttChart from "@/app/components/atoms/GanttChart/GanttChart";
import Table from "@/app/components/atoms/Table/Table";


function Home() {

     const [tasks, setTasks] = useState([])
     const [dependencies, setDependencies] = useState([]);
     const [chartRefreshKey, setChartRefreshKey] = useState(0);

      const refreshTable = () => {
        fetch("http://localhost:8000/gantt")
            .then(response => response.json())
            .then(data => {
                setTasks(data.tasks || []);
                setDependencies(data.dependencies || []);
            })
            .catch(error => console.error(error));
    };

       useEffect(() => {
    refreshTable();
  }, [tasks]);

        const refreshChart = () => {
        setChartRefreshKey(prev => prev + 1);
    };

  return (
    <Container>
      <Navbar/>
        <Container variant="row">
            <Form setTasks={setTasks}  refreshTable={refreshTable} refreshChart={refreshChart}/>
             <Table setTasks={setTasks} tasks={tasks} refreshTable={refreshTable}/>
        </Container>
        <Container variant="row">
             <GanttChart setTasks={setTasks} refreshChartTrigger={chartRefreshKey}/>
             <Chart tasks={tasks} dependencies={dependencies} />
        </Container>
    </Container>
  );
}

export default Home;
