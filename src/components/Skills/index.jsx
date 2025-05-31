import "./index.css";
const Skills = ({ skill }) => {
    const { name, imageUrl } = skill;
    
    
    return (
        <li className="skill-container">
        <img src={imageUrl} alt={name} className="skill-image" />
        <p className="skill-name">{name}</p>
        </li>
    );
}
export default Skills;