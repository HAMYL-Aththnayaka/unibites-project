import React, { useState } from 'react';
import './ContactAdmin.css';
import api from '../../lib/axios.js'


const ContactAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    faculty: '',
    reason: '',
    recommendation: '',
    scholarships: [],
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'scholarships') {
      if (checked) {
       
        setFormData((prev) => ({
          ...prev,
          scholarships: [...prev.scholarships, value],
        }));
      } else {
       
        setFormData((prev) => ({
          ...prev,
          scholarships: prev.scholarships.filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Your request has been sent to the admin!');
  };

  return (
    <div className="contact-admin-container">
      <h2>Contact Admin for Financial Aid</h2>
      <form className="contact-admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Registration No:
            <input
              type="text"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Faculty:
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Reason for Applying:
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Recommendation from Welfare:
            <input
              type="text"
              name="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>Select any scholarships you currently have:</label>
          <div className="checkbox-group">
            {['None', 'Mahapola', 'Bursary'].map((option) => (
              <label key={option} className="checkbox-pill">
                <input
                  type="checkbox"
                  name="scholarships"
                  value={option}
                  checked={formData.scholarships.includes(option)}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactAdmin;
