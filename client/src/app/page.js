
import Navbar from "@/app/molecules/navbar/Navbar";
import Form from "@/app/molecules/form/Form";
import Container from "@/app/components/atoms/Container/Container";
import Chart from "@/app/components/atoms/Chart/Chart";


function Home() {
     const tasks = [
        { id: "A", earliest_start: 0, earliest_finish: 2, latest_start: 0, latest_finish: 2, critical: true },
        { id: "B", earliest_start: 2, earliest_finish: 6, latest_start: 3, latest_finish: 6, critical: true },
        { id: "C", earliest_start: 6, earliest_finish: 11, latest_start: 6, latest_finish: 11, critical: true },
        { id: "D", earliest_start: 11, earliest_finish: 14, latest_start: 11, latest_finish: 14, critical: true },
        { id: "E", earliest_start: 2, earliest_finish: 10, latest_start: 5, latest_finish: 6, critical: false },
        { id: "G", earliest_start: 10, earliest_finish: 14, latest_start: 10, latest_finish: 14, critical: false },
        { id: "H", earliest_start: 14, earliest_finish: 16, latest_start: 14, latest_finish: 16, critical: true }
    ];

    const dependencies = [
        { from: "A", to: "B", label: "A2" },
        { from: "A", to: "C", label: "C3" },
        { from: "B", to: "D", label: "D5" },
        { from: "C", to: "D", label: "F3" },
        { from: "D", to: "H", label: "H2" },
        { from: "B", to: "E", label: "E2" },
        { from: "E", to: "G", label: "G4" },
        { from: "G", to: "H", label: "H2" }
    ];
  return (
    <Container>
      <Navbar/>
        <Container variant="row">
            <Form/>
             <Chart tasks={tasks} dependencies={dependencies} />
        </Container>

    </Container>
  );
}

export default Home;
