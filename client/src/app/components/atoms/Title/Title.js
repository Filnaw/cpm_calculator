import "./Title.css";

function Title({title, variant}){
    return(
        <div>
            <h1 className={`main-heading ${variant}`}>{title}</h1>
        </div>
    );
}

export default Title;