import "./Form.css";
import Input from "@/app/components/atoms/Input/Input";
import Title from "@/app/components/atoms/Title/Title";
import Container from "@/app/components/atoms/Container/Container";
import Button from "@/app/components/atoms/Button/Button";


function Form(){
    return(
        <div className="form">
            <Title title="Calculator" variant="small"/>
            <Input label="Total Cost:"/>
            <Input label="Total Miles:"/>
            <Input label="Cost per Mile:"/>
            <Container variant="row">
                <Button text="Calculate" variant="default"/>
                <Button text="Reset" variant="glass"/>
            </Container>
        </div>
    );
}

export default Form;