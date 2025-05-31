import "./index.css";


const TypeEmployment=(props)=>{
    const{type,employmentfilter}=props
    const{id,label}=type
    console.log(type)
    const checkboxinput=(event)=>{
        employmentfilter(event.target.value)
    }

return(
    <div className="checkbox-container">
        <input type="checkbox" value={label} onChange={checkboxinput}/>
        <label className="labels">{label}</label>
    </div>
)
}
export default TypeEmployment