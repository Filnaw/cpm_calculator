"use client";
import Navbar from "@/app/molecules/navbar/Navbar";
import Form from "@/app/molecules/form/Form";
import Container from "@/app/components/atoms/Container/Container";
import Chart from "@/app/components/atoms/Chart/Chart";
import {useState} from "react";
import GanttChart from "@/app/components/atoms/GanttChart/GanttChart";


function Home() {

     const [tasks, setTasks] = useState([])
     const [dependencies, setDependencies] = useState([]);

  return (
    <Container>
      <Navbar/>
        <Container variant="row">
            <Form setTasks={setTasks} setDependencies={setDependencies}/>
             <Chart tasks={tasks} dependencies={dependencies} />
        </Container>
        <Container variant="row">
             <GanttChart/>
        </Container>
    </Container>
  );
}

export default Home;
