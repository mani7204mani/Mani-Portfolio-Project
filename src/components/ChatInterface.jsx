// src/components/ChatInterface.jsx

import React, { useState } from 'react';
import '../styles/ChatInterface.css';

const CHATBOT_NAME = "Viva";

// ===================================
// DETAILED CONTENT CONSTANTS
// ===================================

const MANI_ABOUT = "Mani is an innovative software developer skilled in .NET, Python, and Java, with experience building scalable full-stack applications and AI-powered solutions using Azure OpenAI. Mani excels at optimizing backend systems, developing secure cloud applications, and delivering impactful results through Agile collaboration.";

const MANI_SKILLS = "Mani has strong expertise in Python, OpenAI, Power BI, SQL, and Excel, along with solid development skills in Java, HTML5, CSS3, JavaScript, and React. Mani is also proficient in building and deploying applications using .NET and Azure, combining both backend and frontend technologies to create powerful, data-driven solutions.";

const MANI_PROJECTS = "Mani has worked on impactful projects including Loan Data Approval EDA, where Mani applied data science techniques for loan prediction using Python, Pandas, NumPy, and Scikit-learn. He also developed a Power BI Dashboard for a Chocolate Factory, creating interactive data visualizations using Power BI, DAX, and Power Query. Additionally, he built an AI-Powered Chatbot Interface, integrating Azure OpenAI, RAG pipelines, and LangChain to deliver intelligent conversational experiences.";

const MANI_EXPERIENCE = "Mani has hands-on experience at Mindsprint, starting as an Intern and later progressing to a Junior Engineer. During his internship, he contributed to the Treasury Bot project, enhancing usability, automating Excel-based workflows, and integrating Azure-backed data pipelines that improved performance and reduced manual effort. As a Junior Engineer, he developed and deployed scalable ASP.NET MVC applications with modular architecture and role-based authentication, while also integrating CLU (Conversational Language Understanding) models to enable intelligent, natural language interactions.";


function ChatInterface({ isOpen, toggleChat }) {
    const [step, setStep] = useState('welcome');
    const [userInput, setUserInput] = useState('');
    const [submittedText, setSubmittedText] = useState('');

    const handleChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const normalizedInput = userInput.toLowerCase().trim();
        setSubmittedText(userInput);
        setUserInput('');

        // Keyword detection logic - Order matters for priority!
        if (normalizedInput.includes('resume')) {
            setStep('resume');
        } else if (normalizedInput.includes('projects') || normalizedInput.includes('project')) {
            setStep('projects');
        } else if (normalizedInput.includes('skills') || normalizedInput.includes('skill')) {
            setStep('skills');
        } else if (normalizedInput.includes('contact') || normalizedInput.includes('chat')) {
            setStep('contact');

            // Check for 'experience' keywords first (Higher Priority)
        } else if (normalizedInput.includes('experience') || normalizedInput.includes('intern') || normalizedInput.includes('engineer')) {
            setStep('experience');

            // Check for 'about' keywords next (Lower Priority)
        } else if (normalizedInput.includes('about mani') || normalizedInput.includes('about')) {
            setStep('about');

        } else {
            setStep('unknown');
        }
    };

    const renderContent = () => {
        // Helper function to close chat and navigate
        const handleCloseAndNavigate = () => {
            setStep('welcome');
            toggleChat();
        };

        // Maps for dynamic content rendering
        const labelMap = {
            projects: "Mani's Projects",
            skills: "Mani's Skills",
            experience: "Mani's Experience",
            contact: "Contact Mani"
        };
        const contentMap = {
            about: MANI_ABOUT,
            projects: MANI_PROJECTS,
            skills: MANI_SKILLS,
            experience: MANI_EXPERIENCE,
            contact: "You can find all of Mani's contact methods on the Contact page."
        };

        // --- MAIN RENDER LOGIC ---
        switch (step) {
            case 'welcome':
                return (
                    <>
                        <p className="bot-message">Hi, I'm {CHATBOT_NAME}, Mani's friend! 👋</p>
                        <p className="bot-message">What do you want to know about my friend Mani?</p>
                        <form onSubmit={handleSubmit} className="chat-form">
                            <input
                                type="text"
                                value={userInput}
                                onChange={handleChange}
                                placeholder="Type your question here..."
                                className="chat-input-field"
                            />
                            <button type="submit" className="chat-submit-btn">Send</button>
                        </form>
                    </>
                );

            case 'resume':
                return (
                    <>
                        <p className="user-message">{submittedText}</p>
                        <p className="bot-message bot-response-text">I can help you with Mani's resume!</p>
                        <a
                            href="/resume.pdf"
                            download="Mani_Reddy.pdf"
                            className="chat-btn-link"
                            onClick={() => setStep('welcome')}
                        >
                            ⬇️ Download Mani's Resume
                        </a>
                        <button onClick={() => setStep('welcome')} className="chat-btn-back">Back to start</button>
                    </>
                );

            case 'about':
            case 'projects':
            case 'skills':
            case 'experience':
            case 'contact':
                const anchor = `#${step}`;
                const responseContent = contentMap[step];
                const showNavLink = step !== 'about';

                return (
                    <>
                        <p className="user-message">{submittedText}</p>

                        {/* Display the correct, long detailed answer */}
                        <p className="bot-message bot-response-text">{responseContent}</p>

                        {/* Display the navigation button if not 'about' */}
                        {showNavLink && (
                            <a
                                href={anchor}
                                className="chat-btn-link"
                                onClick={handleCloseAndNavigate}
                            >
                                Click here to view {labelMap[step]} Page
                            </a>
                        )}

                        <button onClick={() => setStep('welcome')} className="chat-btn-back">
                            {step === 'about' ? 'Ask another question' : 'Back to start'}
                        </button>
                    </>
                );

            case 'unknown':
                return (
                    <>
                        <p className="user-message">{submittedText}</p>
                        <p className="bot-message bot-response-text">I'm sorry, I don't quite understand that question. Try asking about **resume, projects, skills, contact, or about Mani.**</p>
                        <button onClick={() => setStep('welcome')} className="chat-btn-back">Try again</button>
                    </>
                );

            default:
                return <p className="bot-message">Error: Unknown step.</p>;
        }
    };

    return (
        <div className={`chat-box ${isOpen ? 'open' : 'closed'}`}>
            <div className="chat-header">
                <p>{CHATBOT_NAME} - Chatbot</p>
                <button onClick={toggleChat} className="chat-close-btn">&times;</button>
            </div>
            {/* Scrollable chat body */}
            <div className="chat-body">
                {renderContent()}
            </div>
        </div>
    );
}

export default ChatInterface;