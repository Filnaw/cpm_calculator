import "./Input.css";
function Input({label, placeholder})
{
   return(
    <div className="form-group">
        <label className="label">{label}</label>
        <input className="input" placeholder={placeholder}/>
    </div>
   );
}
export default Input;