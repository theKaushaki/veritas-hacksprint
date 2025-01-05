import React, { useState } from 'react';
import './AdminDashboard.css';

// Sample Data for Forms Submitted by Students
const submittedForms = [
  {
    id: 1,
    studentName: 'AMAN',
    formTitle: 'Feedback Form',
    status: 'Pending', // Initial status
    formDetails: 'Details of the feedback form...',
  },
  {
    id: 2,
    studentName: 'JANVI',
    formTitle: 'Course Registration',
    status: 'Pending',
    formDetails: 'Details of the course registration form...',
  },
  {
    id: 3,
    studentName: 'NITIN',
    formTitle: 'Event Participation',
    status: 'Pending',
    formDetails: 'Details of the event participation form...',
  },
];

const AdminDashboard = () => {
  const [forms, setForms] = useState(submittedForms);

  // Function to handle form status change
  const handleStatusChange = (formId, newStatus) => {
    setForms(forms.map((form) => 
      form.id === formId ? { ...form, status: newStatus } : form
    ));
  };

  return (
    <div className="admin-dashboard">
      <h2>University Admin Dashboard</h2>
      <div className="form-list">
        {forms.map((form) => (
          <div key={form.id} className="form-item">
            <h3>{form.formTitle}</h3>
            <p><strong>Student:</strong> {form.studentName}</p>
            <p><strong>Form Details:</strong> {form.formDetails}</p>
            <p><strong>Status:</strong> {form.status}</p>

            <div className="action-buttons">
              <button onClick={() => handleStatusChange(form.id, 'Approved')}>Approve</button>
              <button onClick={() => handleStatusChange(form.id, 'Rejected')}>Reject</button>
              <button onClick={() => handleStatusChange(form.id, 'Revision Requested')}>Request Revision</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
