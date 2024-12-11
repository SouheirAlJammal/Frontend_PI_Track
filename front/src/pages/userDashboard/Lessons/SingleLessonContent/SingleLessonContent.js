import React from 'react';
import axios from 'axios';
import Style from './SingleLessonContent.module.css';
import { useFieldArray, useForm } from 'react-hook-form';
import { useUserStore } from '../../../../Store';
import { FaPencilAlt } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const SingleLessonContent = ({ lesson, onDeleteLesson, getLessons, id }) => {
  const { user } = useUserStore();
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title: lesson.title,
      description: lesson.description,
      totalMins: lesson.totalMins,
      userId: user._id,
      resources: lesson.resources,
      achievedMins: lesson.lessonProgress[0]?.achievedMins || 0, // Initial value of achievedMins
      notes: lesson.lessonProgress[0]?.notes || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'resources',
  });

  // Update lesson details
  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}api/lessons/edit/${id}`,
        getValues() // Pass all the values from the form
      );
      if (response.status === 200) {
        console.log('Lesson updated successfully');
        onDeleteLesson();
        getLessons();
      }
    } catch (error) {
      console.error('Error updating Lesson:', error);
    }

    // Update lesson progress specifically
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}api/lessons/updateProgress`,
        {
          lessonId: lesson._id,
          achievedMins: getValues('achievedMins'), // New achieved minutes value from the form
          notes: getValues('notes') // Updated notes
        }
      );
      if (response.status === 200) {
        console.log('Lesson progress updated successfully');
        onDeleteLesson();
        getLessons();
      }
    } catch (error) {
      console.error('Error updating Lesson progress:', error);
    }
  };

  // Delete lesson
  const handleDeleteLesson = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}api/lessons/delete/${id}`
      );
      if (response.status === 200) {
        console.log('Lesson deleted successfully');
        onDeleteLesson();
        getLessons();
      }
    } catch (error) {
      console.error('Error deleting Lesson:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSaveChanges)}>
      <article className={Style.article}>
        <h3 className={`${Style.edit} ${Style.taskTitle} `}>
          <input
            type="text"
            name="title"
            {...control.register('title', { required: 'Title is required' })}
          />
          <p className="error">{errors.title && errors.title.message}</p>
        </h3>

        <section className={Style.section}>
          <label>About this Lesson
            <textarea
              className={`${Style.edit} ${Style.textarea}`}
              name="description"
              {...control.register('description', { required: 'Description is required' })}
            />
            <p className="error">{errors.description && errors.description.message}</p>
          </label>
        </section>

        <section className={Style.LessonDetails}>
          <h3>Lesson Details</h3>
          <section className={Style.dateContainer}>
            <label htmlFor="totalTime">Total Duration
              <input
                type="text"
                id="totalTime"
                name="totalTime"
                {...control.register('totalMins', { required: 'Total Time is required' })}
              />
            </label>
            <p className="error">{errors.totalMins && errors.totalMins.message}</p>

            <label htmlFor="achievedTime">Achieved Time
              <input
                type="text"
                id="achievedTime"
                name="achievedTime"
                {...control.register('achievedMins')}
              />
            </label>

            <label htmlFor="remainingTime">Remaining Time
              <input
                type="text"
                id="remainingTime"
                name="remainingTime"
                disabled
                value={getValues('totalMins') - getValues('achievedMins')} // Automatically calculate remaining time
              />
            </label>
          </section>

          <label style={{ fontSize: '14px', marginLeft: '10px' }}>Resources</label>
          {fields.map((item, index) => (
            <div key={item.id} className={Style.link}>
              <TextField
                value={item.link}
                onChange={(e) => setValue(`resources.${index}.link`, e.target.value)}
                label={`Resource ${index + 1} Link`}
                variant="outlined"
                fullWidth
              />
              <IconButton onClick={() => remove(index)}>
                <RemoveCircleIcon />
              </IconButton>
            </div>
          ))}
          <IconButton onClick={() => append({ link: '' })}>
            +<p style={{ fontSize: '14px' }}>Add resources</p>
          </IconButton>
        </section>

        <section className={Style.notesection}>
          <label><FaPencilAlt /> Notes
            <textarea
              className={`${Style.edit} ${Style.textarea}`}
              name="notes"
              {...control.register('notes')}
            />
          </label>
        </section>

        <footer className={Style.buttons}>
          <button
            onClick={handleSaveChanges}
            type="button"
            className={Style.saveButton}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDeleteLesson}
            className={Style.deleteButton}
          >
            Delete
          </button>
        </footer>
      </article>
    </form>
  );
};

export default SingleLessonContent;
