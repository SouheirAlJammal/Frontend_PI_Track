import React from 'react';
import style from './Contact.module.css';
import team from '../../assets/team.png';
import { FaArrowRight } from "react-icons/fa";

const Contact = () => {
  return (
    <section className={style.contactSection}>
      <header className={style.header}>
        <h2 className={style.title}>Contact</h2>
        <p className={style.subtitle}>We will be happy to hear from you!</p>
      </header>

      <div className={style.contentContainer}>
        <form className={style.form}>
          <div className={style.personInfo}>
            <label htmlFor="name" className={style.label}>Name:</label>
            <input type="text" id="name" placeholder="Your Name" className={style.textInput} />

            <label htmlFor="email" className={style.label}>Email:</label>
            <input type="email" id="email" placeholder="Your Email" className={style.textInput} />
          </div>

          <label htmlFor="message" className={style.label}>Message:</label>
          <textarea id="message" placeholder="Message" className={style.textArea}></textarea>

          <button type="submit" className={style.submitButton}>
            Submit
            <FaArrowRight />
          </button>
        </form>

        <img alt="contact" src={team} loading="lazy" className={style.image} />
      </div>
    </section>
  );
}

export default Contact;
