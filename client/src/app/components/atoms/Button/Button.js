import "./Button.css";

function Button({onClick, text, variant}){
    return(
        <div className="tooltip-container">
            <div
                onClick={onClick}
                className="button-content"
                data-variant={variant}
            >
                <span className="text">{text}</span>
            </div>
        </div>
    );
}

export default Button;