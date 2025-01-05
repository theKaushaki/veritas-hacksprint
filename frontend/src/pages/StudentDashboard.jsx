import React, { useState } from 'react';
// import './StudentDashboard.css';

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
            onClick={() => handleFormClick(form)} // Toggle the selected form
          >
            {form.title}
          </li>
        ))}
      </ul>

      {/* Only show the form to fill when a form is selected */}
      {selectedForm && (
        <div className="form-container">
          <h2>{selectedForm.title}</h2>
          <form className="form-group">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" />
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="gender" value="male" /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="female" /> Female
                </label>
                <label>
                  <input type="radio" name="gender" value="other" /> Other
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="course">Course:</label>
              <select id="course">
                <option value="">Select a course</option>
                <option value="cs">Computer Science</option>
                <option value="ee">Electrical Engineering</option>
                <option value="me">Mechanical Engineering</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
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
        alt={`${studentDetails.name}'s profile`} // Fixed alt template literal
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
    name: 'John Doe',
    rollNumber: '123456',
    course: 'Computer Science',
    year: '3rd Year',
    profilePicture: 'https://via.placeholder.com/150',
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
      </nav>
      <div className="dashboard-content">{renderSection()}</div>
    </div>
  );
};

export default StudentDashboard;
