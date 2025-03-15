import "./Container.css";


function  Container({children, variant}){

    return(
       <div className={`container ${variant}`}>
           {children}
       </div>
    );
}

export default Container;