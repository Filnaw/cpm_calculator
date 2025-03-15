import "./Form.css";
import Input from "@/app/components/atoms/Input/Input";
import Title from "@/app/components/atoms/Title/Title";
import Container from "@/app/components/atoms/Container/Container";
import Button from "@/app/components/atoms/Button/Button";


function Form(){
    return(
        <div className="form">
            <Title title="Critical Path Method Calculator" variant="small"/>
            <Input label="Task ID:" placeholder="A"/>
            <Input label="Task Name:" placeholder="Task A"/>
            <Input label="Duration (days):" type="number" placeholder="3"/>
            <Input label="Dependencies (comma-separated IDs):" placeholder="B,C"/>
            <Container variant="row">
                <Button text="Add Task" variant="default"/>
                <Button text="Reset" variant="glass"/>
            </Container>
            <Container variant="row">
                <Button text="Calculate CPM" variant="primary" />
            </Container>
        </div>
    );
}

export default Form;