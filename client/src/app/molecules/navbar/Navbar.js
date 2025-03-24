import "./Navbar.css";
import Title from "@/app/components/atoms/Title/Title";
function Navbar(){
    return(
        <div className="navbar">
            <Title title="CPM Calculator" variant="gradient"/>
        </div>
    );
}

export default Navbar;