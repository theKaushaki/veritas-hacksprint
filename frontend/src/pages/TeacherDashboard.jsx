import React, { useEffect, useState } from 'react';
import '../styles/TeacherDashboard.css';
import useFetch from '../customHooks/useFetch';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

// ProfileSection Component
const ProfileSection = ({ teacherDetails }) => {

  const { user } = useAuth();

  return (
    <div className="profile-section">
      <img
        src={teacherDetails.profilePicture}
        alt={`${user.name}'s profile`}
        className="profile-picture"
      />
      <div className="credentials">
        <h2>{user.name}</h2>
        <p><strong>Employee ID:</strong> {user.id}</p>
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
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const { data, error, loading } = useFetch('/submissions');

  useEffect(() => {
    if (data) {
      setSubmissions(data);
    }

    if (error) {
      toast.error("Error fetching submissions");
    }
  }, [data, error]);

  const submissionsGroupedByProcedure = submissions.reduce((acc, submission) => {
    if (!acc[submission.procedureId]) {
      acc[submission.procedureId] = [];
    }
    acc[submission.procedureId].push(submission);
    return acc;
  }, {});

  const groupByStudent = (procedureSubmissions) => {
    return procedureSubmissions.reduce((acc, submission) => {
      const studentId = submission.studentId._id;
      if (!acc[studentId]) {
        acc[studentId] = {
          name: submission.studentId.name,
          submissionCount: 0,
        };
      }
      acc[studentId].submissionCount += 1;
      return acc;
    }, {});
  };

  const handleSubmissionClick = (submissionId) => {
    const submission = submissions.find(sub => sub._id === submissionId);
    setSelectedSubmission(submission);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="submissions-page">
      <div className="submissions-and-preview">
        <div className="submissions-list">
          {submissions.length === 0 ? (
            <p>No submissions found.</p>
          ) : (
            Object.keys(submissionsGroupedByProcedure).map((procedureId) => {
              const procedure = submissionsGroupedByProcedure[procedureId];
              const studentsGrouped = groupByStudent(procedure);

              return (
                <div key={procedureId} className="procedure-item">
                  <h3>{procedure[0]?.procedureId.title}</h3>
                  <ul>
                    {Object.keys(studentsGrouped).map((studentId) => {
                      const student = studentsGrouped[studentId];
                      return (
                        <li key={studentId}>
                          <span className="student-name">{student.name}</span>
                          <span className="submission-count">
                            {student.submissionCount} submission(s)
                          </span>
                          <ul>
                            {procedure.map((submission) => {
                              if (submission.studentId._id === studentId) {
                                return (
                                  <li key={submission._id}
                                    className="submission"
                                    style={{
                                      backgroundColor: selectedSubmission?._id === submission._id ? 'lightblue' : 'white',
                                      color: selectedSubmission?._id === submission._id ? 'black' : 'black',
                                    }}
                                    onClick={() => handleSubmissionClick(submission._id)}>
                                    {new Date(submission.createdAt).toLocaleString()}
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>

        {selectedSubmission && (
          <div className="response-details">
            <h3>Responses for Submission</h3>
            <p><strong>Student:</strong> {selectedSubmission.studentId.name}</p>
            <p><strong>Email:</strong> {selectedSubmission.studentId.email}</p>
            <p><strong>Procedure:</strong> {selectedSubmission.procedureId.title}</p>

            <h4>Responses:</h4>
            <ul>
              {selectedSubmission.responses.map((response) => (
                <li key={response._id}>
                  {response.value || "No response"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

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

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const { logoutUser } = useAuth();

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
        <button className="logout-button" onClick={() => {
          logoutUser();
        }}>Logout</button>
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
