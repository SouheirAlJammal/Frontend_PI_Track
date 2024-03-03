import React, { useState } from 'react';
import style from './Contact.module.css';
import team from '../../assets/team.png';
import { RiSendPlaneFill } from "react-icons/ri";
import { Element } from 'react-scroll';
import BackGround from '../BackGround/BackGround';
const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await sendingMail(formData);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <Element className={style.contactSection} name='contactSection' id='contact'>
      <header className={style.header}>
        <h2 className={style.title}>Contact</h2>
        <p className={style.subtitle}>We will be happy to hear from you!</p>
      </header>

      <div className={style.contentContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.personInfo}>
            <label htmlFor="name" className={style.label}>Name:</label>
            <input type="text" id="name" placeholder="Your Name" className={style.textInput} value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email" className={style.label}>Email:</label>
            <input type="email" id="email" placeholder="Your Email" className={style.textInput} value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="message" className={style.label}>Message:</label>
          <textarea id="message" placeholder="Message" className={style.textArea} value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className={style.submitButton}>
            Submit
            <RiSendPlaneFill />
          </button>
        </form>

        <img alt="contact" src={team} loading="lazy" className={style.image} />
            </div>
    </Element>
    
  );
}

export default Contact;
