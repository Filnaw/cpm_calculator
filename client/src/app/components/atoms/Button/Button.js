import "./Button.css";

function Button({text, variant}){
    return(
        <div className="tooltip-container">
            <div className="button-content" data-variant={variant}>
                <span className="text">{text}</span>
            </div>
        </div>
    );
}

export default Button;