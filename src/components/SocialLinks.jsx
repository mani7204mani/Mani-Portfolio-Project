// src/components/SocialLinks.jsx

import React from 'react';
import '../styles/SocialLinks.css'; // New CSS file

function SocialLinks() {
    // Your contact details
    const email = "mani7204mani@gmail.com";
    const linkedInUrl = "https://www.linkedin.com/in/mani-shankar-reddy-56879627b";
    const whatsappNumber = "916301585008"; // India code 91 + number
    const whatsappText = "Hello, I saw your portfolio and would like to connect.";
    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    return (
        <div className="social-links">

            {/* 1. LinkedIn Icon Link */}
            <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn Profile"
            >
                {/* 💡 Use the IMG tag referencing the file in /public 💡 */}
                <img src="/linkedin.svg" alt="LinkedIn" className="social-icon-img" />
            </a>

            {/* 2. Gmail Icon Link */}
            <a
                href={`mailto:${email}`}
                className="social-icon"
                aria-label="Send email"
            >
                <img src="/gmail.svg" alt="Gmail" className="social-icon-img" />
            </a>

            {/* 3. WhatsApp Icon Link */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Chat on WhatsApp"
            >
                <img src="/whatsapp.svg" alt="WhatsApp" className="social-icon-img" />
            </a>
        </div>
    );
}

export default SocialLinks;