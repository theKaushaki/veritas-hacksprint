import React, { useEffect, useState } from 'react';
import '../styles/StudentDashboard.css';
import { useAuth } from '../context/AuthContext';
import useFetch from '../customHooks/useFetch';
import usePost from '../customHooks/usePost';

// FormsPage Component
const FormsPage = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const { data: formData, loading: formLoading, error: formError } = useFetch('/procedures/all');
  const [responses, setResponses] = useState({});
  const { data, error, loading, postData } = usePost(`/procedures/${selectedForm?._id}/apply`);

  const handleFormClick = (form) => {
    if (selectedForm && selectedForm._id === form._id) {
      setSelectedForm(null);
    } else {
      setSelectedForm(form);
    }
  };

  const handleInputChange = (fieldId, value) => {
    setResponses({
      ...responses,
      [fieldId]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      responses: Object.keys(responses).map((key) => ({
        id: key,
        value: responses[key],
      })),
    };

    try {
      await postData(payload);
      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit form!");
    }
  };

  return (
    <div className="forms-page">
      <h2>Available Forms</h2>

      <ul className="forms-list">
        {formData?.length > 0 ? (
          formData.map((form) => (
            <li
              key={form._id}
              className="form-item"
              onClick={() => handleFormClick(form)}
            >
              {form.title}
            </li>
          ))
        ) : (
          <p>No forms available.</p>
        )}
      </ul>

      {selectedForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>{selectedForm.title}</h2>
          <p><strong>Description:</strong> {selectedForm.description}</p>

          <h3>Form Fields</h3>
          <ul className="form-fields" style={{ listStyleType: 'none' }}>
            {selectedForm.formFields.map((field) => (
              <li key={field._id} className="form-field">
                <label htmlFor={field._id} className="field-label">{field.value}</label>
                <input
                  id={field._id}
                  type={field.fieldType}
                  placeholder={field.fieldName}
                  value={responses[field._id] || ""}
                  onChange={(e) => handleInputChange(field._id, e.target.value)}
                  className="field-input"
                />
              </li>
            ))}
          </ul>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          <h3>Deadline</h3>
          <p>{new Date(selectedForm.deadline).toLocaleDateString()}</p>
        </form>
      )}
    </div>
  );
};

// ProfilePage Component
const ProfilePage = ({ studentDetails }) => {
  const { logoutUser, user } = useAuth()

  return (
    <div className="profile-section">
      <img
        src={studentDetails.profilePicture}
        alt={`${user?.name}'s profile`}
        className="profile-picture"
      />
      <div className="credentials">
        <h2>{user.name}</h2>
        <p><strong>Roll Number:</strong> {user.id}</p>
      </div>
    </div>
  );
};

// Main StudentDashboard Component
const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const { logoutUser } = useAuth()

  const studentDetails = {
    name: 'AMAN DEV',
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

        <button
          className="notification-button"
          onClick={() => logoutUser()}
        >
          Logout
        </button>
      </nav>
      <div className="dashboard-content">{renderSection()}</div>
    </div>
  );
};

export default StudentDashboard;
