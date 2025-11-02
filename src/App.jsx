// src/App.jsx

import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
// Ensure this import path is correct based on your file structure (src/styles/App.css or src/App.css)
import SkillCard from './components/SkillCard'; // 💡 NEW IMPORT 💡
import EducationCard from './components/EducationCard';
import ExperienceCard from './components/ExperienceCard'; // 💡 NEW IMPORT 💡
import Modal from './components/Modal'; 
import SocialLinks from './components/SocialLinks'; 
import FloatingChatManager from './components/FloatingChatManager';
import './App.css'; 

const workExperienceData = [
  {
    id: 1,
    role: "Junior Engineer",
    company: "Mindsprint",
    duration: "09/2025 – Present",
    location: "Chennai",
    details: [
      "Developed and deployed an ASP.NET MVC web application, implementing modular design and role-based authentication for scalable enterprise use.",
      "Built .NET backend services to integrate with CLU (Conversational Language Understanding) models, enabling accurate natural language intent recognition."
    ]
  },
  {
    id: 2,
    role: "Intern",
    company: "Mindsprint",
    duration: "01/2025 – 08/2025",
    location: "Chennai",
    project: "Project: Treasury Bot | Tech Stack: .NET, JavaScript, HTML/CSS, Microsoft Azure, Copilot Studio",
    details: [
      "Refactored front-end logic by redesigning user workflows, increasing usability and reducing user errors by 25%.",
      "Engineered backend automation pipeline to parse and normalize Excel uploads, decreasing manual processing time by 60%.",
      "Integrated real-time data binding between Azure Tables and frontend views, enhancing UI responsiveness by 30%.",
      "Optimized interface clarity by dynamically filtering non-relevant data columns, improving user focus and reducing visual clutter."
    ]
  }
];
const educationData = [
  {
    degree: "B.Tech. in Computer Science",
    institution: "Amrita Vishwa Vidyapeetham",
    details: "CGPA: 8.61/10"
  },
  {
    degree: "Intermediate (12th Grade)",
    institution: "Sri Chaitanya Junior College",
    details: "Marks: 962/1000"
  },
  {
    degree: "SSC (10th Grade)",
    institution: "Bhashyam Public School",
    details: "Grade: 10/10"
  }
];
// Sample data for your projects. Replace this with your actual portfolio items.
const sampleProjects = [
  {
    title: "Customer Shopping Behavior Analysis",
    description: "Analyzed 3,900 customer purchases to uncover key insights into spending patterns, product preferences, and subscription behavior. The project involved data cleaning, feature engineering, structured SQL analysis (PostgreSQL) to answer 10 key business questions, and a final interactive dashboard (Power BI) for visual presentation of findings and strategic business recommendations.",
    technologies: ["Python", "Pandas", "PostgreSQL", "SQL", "Power Bi"],
    link: "https://github.com/mani7204mani/Customer-Behavior-Project"
  },
  {
    title: "Loan-Data-Approval-EDA",
    description: "This project applies data science methodologies to predict loan approval, covering the entire workflow from generating and cleaning synthetic financial data to visualizing key correlations and preparing features for machine learning.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "SciPy Stats","Jupyter"],
    link: "https://github.com/mani7204mani/Loan-Data-Approval-EDA"
  },
  {
    title: "PowerBi-DashBoard-Chocolate-Factory",
    description: "An interactive dashboard visualizing chocolate production data using Power BI,DAX and power query.",
    technologies: ["Power BI", "DAX", "Power Query"],
    link: "https://github.com/mani7204mani/PowerBi-DashBoard-Chocolate-Factory"
  },
  {
    title: "AI-Powered Chatbot Interface",
    description: "A modern, conversational UI designed for seamless integration with OpenAI APIs.",
    technologies: ["Streamlit", "Python", "Azure OpenAI", "RAG"," LangChain"],
    link: "https://example.com/chatbot"
  },
  {
    "title": "Tourist Management System (TMS)",
    "description": "A full-stack web application for managing tourist tours, handling user registrations (with email OTP verification), administering destinations (CRUD), processing tour bookings, and providing users with a comprehensive booking history. The system includes separate functionalities for public users and administrative staff.",
    "technologies": [
        "Python (Flask)",
        "React.js (Frontend)",
        "PostgreSQL (SQLAlchemy)",
        "Flask-Bcrypt",
        "Email Verification (SMTP)",
        "RESTful APIs",
        "OTP Authentication"
    ],
    "link": "https://github.com/mani7204mani/tourist-management-system"
}
];
const skillData = [
  { name: "Python", image: "python.svg" },
  { name: "OpenAI", image: "openai.svg" },
  { name: "PowerBI", image: "powerbi.svg" },
  { name: "SQL", image: "sql.svg" },
  { name: "Excel", image: "excel.svg" },
  { name: "Java", image: "java.svg" },
  { name: "HTML5", image: "html5.svg" },
  { name: "CSS3", image: "css3.svg" },
  { name: "React", image: "react.svg" }, // Use actual image paths (e.g., in /assets)
  { name: "JavaScript", image: "javascript.svg" },
  { name: "Azure", image: "azure.svg" },
  { name: ".NET", image: "dotnet.svg" },
  { name: "Git", image: "git.svg" },
  { name: "Flask", image: "flask.svg" },
  // Add more skills to match the 10 boxes in your image
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const openModal = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };
  return (
    <div className="portfolio-container">
      {/* 1. Header Component (Navigation) */}
      <Header />

      {/* 2. Hero Section (Home) - Target for #hero link */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          {/* 💡 1. CIRCULAR IMAGE PLACEMENT 💡 */}
          {/* Ensure 'profile.jpg' is in your /public folder */}
          <img src="/profile.jpg" alt="Mani Reddy Professional Portrait" className="hero-profile-img-circle" />
          
          <h1>Hi, I'm P.Mani Shankar Reddy.</h1>  
          <p className="hero-subtitle">Innovative Software Engineer | .NET & Chatbot Developer | AI Enthusiast | Data Enthusiast</p>
          <a 
          href="https://wa.me/916301585008?text=Hello%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." 
          target="_blank"             /* Opens the chat in a new tab/window */
          rel="noopener noreferrer"   /* Security best practice for target="_blank" */
          className="btn-primary large-btn"
        >
          Say Hello 👋
          </a>
        </div>
      </section>

      {/* 3. Experience Section - Target for #experience link */}
      <section id="experience" className="section-padding experience-section">
        <h2>Work Experience</h2>
        <div className="experience-grid"> {/* 💡 NEW GRID CLASS */}
          {workExperienceData.map((exp) => (
            <ExperienceCard 
              key={exp.id} 
              experience={exp}
              openModal={openModal} /* Pass handler down */
            />
          ))}
        </div>
      </section>

      {/* 4. Projects Section - Target for #projects link */}
      <section id="projects" className="section-padding projects-section">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {/* Renders a ProjectCard component for each item in the sampleProjects array */}
          {sampleProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
      
      {/* 5. Skills Section - Target for #skills link */}
      <section id="skills" className="section-padding skills-section">
        <h2>Skills & Expertise</h2>
        <div className="skills-grid-container"> {/* 💡 Use a NEW class name 💡 */}
          {skillData.map((skill) => (
            <SkillCard 
              key={skill.name} 
              skillName={skill.name} 
              // IMPORTANT: Images should be placed in the 'public' or 'src/assets' folder
              imageUrl={`${skill.image}`} 
            />
          ))}
        </div>
      </section>
      <section id="education" className="section-padding education-section">
        <h2>Education</h2>
        <div className="education-grid">
          {educationData.map((item, index) => (
            <EducationCard 
              key={index} 
              degree={item.degree}
              institution={item.institution}
              details={item.details}
            />
          ))}
          {/* 💡 MODAL COMPONENT 💡 */}
      {selectedExperience && (
        <Modal 
          isOpen={isModalOpen} 
          closeModal={closeModal} 
          experience={selectedExperience} 
        />
      )}
        </div>
      </section>

      {/* 6. Contact Section - Target for #contact link */}
      <section id="contact" className="section-padding contact-section">
        <h2>Get In Touch</h2>
        <p>I'm currently available for new opportunities. Feel free to reach out!</p>
        <SocialLinks />
      </section>

      {/* Footer */}
      <footer>
        
        <p>Built with React & ❤️</p>
        <p>&copy; {new Date().getFullYear()} [Mani_Reddy]</p>
      </footer>
      <FloatingChatManager />
    </div>
  );
}

export default App;