// TaskHeader.js
import React, { useState } from 'react';
import style from './TaskHeader.module.css';

const TaskHeader = ({ getData, title, subtitle, formComponent }) => {
  const [sortBy, setSortBy] = useState('Sort By');
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    console.log('Sort By:', event.target.value);
  };

  return (
    <>
      <div className={style.DashHeader}>
        <section className={style.header}>
          <h2 className={style.title}>{title}</h2>
          <p className={style.subtitle}>{subtitle}</p>
        </section>
        <section className={style.function}>
          <button className={style.button} onClick={handleOpenModal}>
            Add {title}
          </button>
          <label htmlFor="sortBy" style={{ display: 'none' }}>
            Sort By:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className={style.sorting}
          >
            <option value="Sort By" disabled>
              Sort By
            </option>
            <option value="recent">Most recent</option>
            <option value="old">Most Old</option>
            <option value="Today">Today</option>
          </select>
        </section>
      </div>
      {formComponent && (
        <formComponent showModal={openModal} handleClose={handleCloseModal} getData={getData} />
      )}
    </>
  );
};

export default TaskHeader;
