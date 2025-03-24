import "./Input.css";
function Input({ label, placeholder, value = "", onChange }) {
   return (
    <div className="form-group">
        <label className="label">{label}</label>
        <input
            className="input"
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
        />
    </div>
   );
}

export default Input;