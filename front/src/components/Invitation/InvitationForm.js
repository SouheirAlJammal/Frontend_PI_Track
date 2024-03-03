import React, { useState } from 'react';
import axios from 'axios';
import style from './InvitationForm.module.css'
const InvitationForm = ({ planId }) => {
  console.log(planId)
  const [formData, setFormData] = useState({
    email: '',
    role: 'follower',
  });
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendInvitation = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}api/plans/inviteUser/${planId}`,
       { ...formData,
        planId}
      );

      if (response) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvite = () => {
    if (!isValidEmail(formData.email)) {
      setError('Invalid email address');
      return;
    }

    setError('');
    sendInvitation();
  };

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className={style.form}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder='Email'
      />

      <label>Role</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="editor">Editor</option>
        <option value="follower">Follower</option>
      </select>

      <p style={{ color: 'red' }}>{error}</p>
      <button onClick={handleInvite}>Invite User</button>
    </form>
  );
};

export default InvitationForm;
