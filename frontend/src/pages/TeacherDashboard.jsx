import React, { useState } from 'react';
import './TeacherDashboard.css';

// ProfileSection Component
const ProfileSection = ({ teacherDetails }) => {
  return (
    <div className="profile-section">
      <img
        src={teacherDetails.profilePicture}
        alt={`${teacherDetails.name}'s profile`}
        className="profile-picture"
      />
      <div className="credentials">
        <h2>{teacherDetails.name}</h2>
        <p><strong>Employee ID:</strong> {teacherDetails.employeeId}</p>
        <p><strong>Subject:</strong> {teacherDetails.subject}</p>
        <p><strong>Years of Experience:</strong> {teacherDetails.experience}</p>
      </div>
    </div>
  );
};

// CreateSection Component
const CreateSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('New item created!');
  };

  return (
    <div className="create-section">
      <h2>Create New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" placeholder="Enter title" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Enter description"
            rows="5"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};

// ManageSection Component
const ManageSection = () => {
  const items = [
    { id: 1, title: 'Assignment 1', description: 'First assignment details' },
    { id: 2, title: 'Quiz 1', description: 'First quiz details' },
    { id: 3, title: 'Project 1', description: 'First project details' },
  ];

  const handleDelete = (id) => {
    alert(`Item with ID ${id} deleted.`);
  };

  return (
    <div className="manage-section">
      <h2>Manage Items</h2>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button
              className="delete-button"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// NotificationButton Component
const NotificationButton = () => {
  const handleNotificationClick = () => {
    window.open('https://mail.google.com/', '_blank');
  };

  return (
    <button className="notification-button" onClick={handleNotificationClick}>
      Notifications
    </button>
  );
};

// Main TeacherDashboard Component
const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');

  const teacherDetails = {
    name: 'Dr. MADVAN',
    employeeId: '12345',
    subject: 'COMPUTER',
    experience: '10 years',
    profilePicture:
      'https://cdn.pixabay.com/photo/2012/04/13/00/21/lady-31217_1280.png',
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Profile':
        return <ProfileSection teacherDetails={teacherDetails} />;
      case 'Create':
        return <CreateSection />;
      case 'Manage':
        return <ManageSection />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <NotificationButton />
      </header>
      <nav className="dashboard-nav">
        <ul>
          <li
            className={activeSection === 'Profile' ? 'active' : ''}
            onClick={() => setActiveSection('Profile')}
          >
            Profile
          </li>
          <li
            className={activeSection === 'Create' ? 'active' : ''}
            onClick={() => setActiveSection('Create')}
          >
            Create
          </li>
          <li
            className={activeSection === 'Manage' ? 'active' : ''}
            onClick={() => setActiveSection('Manage')}
          >
            Manage
          </li>
        </ul>
      </nav>
      <div className="dashboard-content">{renderSection()}</div>
    </div>
  );
};

export default TeacherDashboard;
