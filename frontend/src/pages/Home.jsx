import React, { useState, useEffect } from 'react';
import logo from '../assets/UPMS.png';
import '../styles/home.css';
import AuthPopup from '../components/AuthPopup';

export default function Home({ login }) {
  const [loginType, setLoginType] = useState('student');
  const [showLoginPopup, setShowLoginPopup] = useState(login);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [registerType, setRegisterType] = useState('student');
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    const offset = 80;
    const topPosition = target.offsetTop - offset;

    window.scrollTo({
      top: topPosition,
      behavior: 'smooth'
    });
  };


  const openLoginPopup = (type) => {
    setLoginType(type);
    setShowLoginPopup(true);
    setShowRegisterPopup(false);
  };


  const handleClickOutside = (e) => {
    if (e.target.className === 'login-popup-overlay' || e.target.className === 'register-popup-overlay') {
      setShowLoginPopup(false);
      setShowRegisterPopup(false);
    }
  };


  const openRegisterPopup = (type) => {
    setRegisterType(type);
    setShowRegisterPopup(true);
    setShowLoginPopup(false);
  };

  useEffect(() => {

    document.addEventListener('click', handleClickOutside);
    return () => {

      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header>
        <div className="navbar">
          <img src={logo} alt="UPMS Logo" className="logo" />
          <nav>
            <ul>
              {/* Home link will call scrollToTop function */}
              <li><a href="#" onClick={scrollToTop}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleScroll(e, "#about")}>About</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, "#services")}>Services</a></li>
              <li><a href="#" onClick={() => openLoginPopup('student')}>Login</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <h1>Welcome to University Procedure Management System</h1>
          <p>Simplifying academic workflows for students and universities.</p>
          <div className="button-group">
            <button className="register-button" onClick={() => openRegisterPopup('student')}>Register</button>
          </div>
        </section>

        <section id="about" className="about">
          <h2>About Us</h2>
          <hr className="about-hr" /> {/* Horizontal line under the heading */}
          <p>UniForm aims to revolutionize the way universities manage administrative processes by creating a unified, transparent, and automated system that improves communication, reduces delays, and enhances the overall academic experience. By aligning with the principles of accessibility and sustainability, UniForm demonstrates how technology can drive positive change in educational institutions.</p>
          <div className="two-columns">
            <div className="column">
              <h3>Key Features and Benefits</h3>
              <p>UPMS provides intuitive dashboards tailored to the specific roles of students, faculty, and administrators. These dashboards offer a personalized view of tasks, progress, and relevant information, simplifying the management of academic procedures.</p>
            </div>
            <div className="column">
              <h3>Dynamic Forms and Workflow Automation</h3>
              <p>The system features dynamic forms for applications, approvals, and other procedures. These forms are easily customizable, reducing manual paperwork and streamlining the workflow. UPMS also automates the approval process, ensuring timely and efficient handling of requests.</p>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <hr className="services-hr" /> {/* Horizontal line under the heading */}
          <div className="services-container">
            <div className="service-box">
              <h3>Course Registration</h3>
              <ul>
                <li>Simplifies the process of enrolling in courses for students.</li>
                <li>Allows students to easily submit course registration forms online.</li>
              </ul>
            </div>
            <div className="service-box">
              <h3>Transcript Requests</h3>
              <ul>
                <li>Facilitates the submission and processing of transcript requests.</li>
                <li>Ensures timely delivery of academic transcripts to students.</li>
              </ul>
            </div>
            <div className="service-box">
              <h3>Dynamic Forms and Workflow Automation</h3>
              <ul>
                <li>Features customizable and dynamic forms for different academic procedures.</li>
                <li>Automates the approval process for efficient handling of requests.</li>
              </ul>
            </div>
            <div className="service-box">
              <h3>Real-Time Notifications</h3>
              <ul>
                <li>Sends instant notifications via in-app alerts and email.</li>
                <li>Keeps students, faculty, and administrators updated on submissions and approvals.</li>
              </ul>
            </div>
            <div className="service-box">
              <h3>Form Management</h3>
              <ul>
                <li>Provides an intuitive interface for creating, submitting, and approving  forms.</li>
                <li>Supports various forms, including leave requests, grade appeals, and scholarships.</li>
              </ul>
            </div>
            <div className="service-box">
              <h3>Role-Based Dashboards</h3>
              <ul>
                <li>Provides tailored dashboards for students, faculty, and administrators.</li>
                <li>Offers a personalized view of tasks, progress, and relevant information.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Veritas. All Rights Reserved.</p>
      </footer>

      <AuthPopup openLoginPopup={openLoginPopup} openRegisterPopup={openRegisterPopup} showLoginPopup={showLoginPopup} showRegisterPopup={showRegisterPopup} />

    </>
  );
}
