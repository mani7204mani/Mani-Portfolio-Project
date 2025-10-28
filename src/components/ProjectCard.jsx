// src/components/ProjectCard.jsx (Focus on the Link Text)
import '../styles/ProjectCard.css';
function ProjectCard({ title, description, technologies, link }) {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-stack">{technologies.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}</div>
      
      {/* 💡 CHANGE THE TEXT HERE 💡 */}
      <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
        Click here to view the Project
      </a>
      
      <div className="hover-overlay"></div> {/* For the interactive background */}
    </div>
  );
}
export default ProjectCard;