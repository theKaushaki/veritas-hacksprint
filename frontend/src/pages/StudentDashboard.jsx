import React, { useState } from 'react';
import './StudentDashboard.css';

// FormsPage Component
const FormsPage = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const formsList = [
    { id: 1, title: 'Feedback Form', url: 'https://forms.gle/example1' },
    { id: 2, title: 'Course Registration', url: 'https://forms.gle/example2' },
    { id: 3, title: 'Event Participation', url: 'https://forms.gle/example3' },
  ];

  const handleFormClick = (form) => {
    if (selectedForm && selectedForm.id === form.id) {
      setSelectedForm(null); // Close the form if clicked twice
    } else {
      setSelectedForm(form); // Open the selected form
    }
  };

  return (
    <div className="forms-page">
      <h2>Available Forms</h2>
      <ul className="forms-list">
        {formsList.map((form) => (
          <li
            key={form.id}
            className="form-item"
            onClick={() => handleFormClick(form)}
          >
            {form.title}
          </li>
        ))}
      </ul>

      {selectedForm && (
        <div className="form-container">
          <h2>{selectedForm.title}</h2>
          <p>
            Open the form here: <a href={selectedForm.url} target="_blank" rel="noopener noreferrer">Click here</a>
          </p>
        </div>
      )}
    </div>
  );
};

// ProfilePage Component
const ProfilePage = ({ studentDetails }) => {
  return (
    <div className="profile-section">
      <img
        src={studentDetails.profilePicture}
        alt={`${studentDetails.name}'s profile`}
        className="profile-picture"
      />
      <div className="credentials">
        <h2>{studentDetails.name}</h2>
        <p><strong>Roll Number:</strong> {studentDetails.rollNumber}</p>
        <p><strong>Course:</strong> {studentDetails.course}</p>
        <p><strong>Year:</strong> {studentDetails.year}</p>
      </div>
    </div>
  );
};

// Main StudentDashboard Component
const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');

  const studentDetails = {
    name: 'AMAN',
    rollNumber: '123456',
    course: 'Computer Science',
    year: '3rd Year',
    profilePicture: 'https://img.freepik.com/premium-vector/beautiful-student-girl-vector-art_795447-84.jpg?w=740',
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Profile':
        return <ProfilePage studentDetails={studentDetails} />;
      case 'Forms':
        return <FormsPage />;
      case 'Track':
        return <div className="placeholder-section">Track Content Coming Soon!</div>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <ul>
          <li
            className={activeSection === 'Profile' ? 'active' : ''}
            onClick={() => setActiveSection('Profile')}
          >
            Profile
          </li>
          <li
            className={activeSection === 'Forms' ? 'active' : ''}
            onClick={() => setActiveSection('Forms')}
          >
            Forms
          </li>
          <li
            className={activeSection === 'Track' ? 'active' : ''}
            onClick={() => setActiveSection('Track')}
          >
            Track
          </li>
        </ul>
        {/* Add the Notification Button */}
        <button
          className="notification-button"
          onClick={() => window.open('https://mail.google.com', '_blank')}
        >
          Notifications
        </button>
      </nav>
      <div className="dashboard-content">{renderSection()}</div>
    </div>
  );
};

export default StudentDashboard;
