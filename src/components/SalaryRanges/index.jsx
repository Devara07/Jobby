import "./index.css";
const SalaryRanges = ({salary,salaryfilter}) => {
    const { id, label } = salary;
    const selectedoption = (event) => {
        
        salaryfilter(id);
    };

    return (
        <div className="checkbox-container">
            <input type="radio" id={`salary-${id}`} name="range" onChange={selectedoption} value={label} />
            <label htmlFor={`salary-${id}`} className="labels">
                {label}
            </label>
        </div>
    );
}
export default SalaryRanges;