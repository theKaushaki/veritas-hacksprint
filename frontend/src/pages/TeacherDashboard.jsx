import React, { useEffect, useState } from 'react';
import '../styles/TeacherDashboard.css';
import useFetch from '../customHooks/useFetch';
import { toast } from 'react-toastify';

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

const ManageSection = () => {

  const [submissions, setSubmissions] = useState([]);
  const { data, error, loading } = useFetch('/submissions');  // Call the API endpoint to get submissions

  useEffect(() => {
    if (data) {
      setSubmissions(data);
    }

    if (error) {
      toast.error("Error fetching submissions");
    }
  }, [data, error]);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(submissions);

  return (
    <div className="submissions-page">
      <h2>All Submissions</h2>
      <ul className="submissions-list" style={{ listStyle: 'none' }}>
        {submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          submissions.map((submission) => (
            <li key={submission._id} className="submission-item">
              <p><strong>Student:</strong> {submission.studentId.name}</p>
              <p><strong>Status:</strong> {submission.status}</p>
              <p><strong>Teacher Comments:</strong> {submission.teacherComments || 'No comments'}</p>
              <p><strong>Submitted on:</strong> {new Date(submission.createdAt).toLocaleDateString()}</p>
            </li>
          ))
        )}
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
            Submissions
          </li>
        </ul>
      </nav>
      <div className="dashboard-content">{renderSection()}</div>
    </div>
  );
};

export default TeacherDashboard;
