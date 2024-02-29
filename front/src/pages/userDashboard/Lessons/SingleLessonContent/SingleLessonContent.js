import React from 'react';
import axios from 'axios';
import Style from './SingleLessonContent.module.css';
import Button from '@mui/material/Button';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { useUserStore } from '../../../../Store';
import { FaPencilAlt } from "react-icons/fa";

const SingleLessonContent = ({ lesson, OnDeleteLesson, getLessons, id }) => {
  const { user } = useUserStore();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: lesson.title,
      description: lesson.description,
      totalMins: lesson.totalMins,
      userId: user._id,
      resources: lesson.resources,
      achievedMins: lesson.lessonProgress[0]?.achievedMins || 0,
      lessonProgress: lesson.lessonProgress,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'resources',
  });

  const handleDeleteLesson = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}api/lessons/delete/${id}`
      );
      if (response.status === 200) {
        console.log('Lesson deleted successfully');
        OnDeleteLesson();
        getLessons();
      }
    } catch (error) {
      console.error('Error deleting Lesson:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}api/lessons/edit/${id}`,
        control.getValues()
      );
      if (response.status === 200) {
        console.log('Lesson updated successfully');
        OnDeleteLesson();
        getLessons();
      }
    } catch (error) {
      console.error('Error updating Lesson:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSaveChanges)}>
      <article className={Style.article}>
        <h3 className={`${Style.edit} ${Style.taskTitle} `}>
          <input
            type='text'
            name='title'
            {...control.register('title', { required: 'Title is required' })}
          />
          {/* Display title error */}
          <p className="error">{errors.title && errors.title.message}</p>
        </h3>
        <section className={Style.section}>
          <label>About this Lesson
            <textarea
              className={`${Style.edit} ${Style.textarea}`}
              name='description'
              {...control.register('description', { required: 'Description is required' })}
            />
            {/* Display description error */}
            <p className="error">{errors.description && errors.description.message}</p>
          </label>
        </section>
        <section className={Style.LessonDetails}>
          <h3>Lesson Details</h3>

          <section className={Style.dateContainer}>
            <label htmlFor="totalTime">Total Time
              <input
                type="text"
                id="totalTime"
                name="totalTime"
                {...control.register('totalMins', { required: 'Total Time is required' })}
              /></label>
            {/* Display totalMins error */}
            <p className="error">{errors.totalMins && errors.totalMins.message}</p>

            <label htmlFor="achievedTime">Total Duration
              <input
                type="text"
                id="achievedTime"
                name="achievedTime"
                {...control.register('achievedMins')}
              />
            </label>
            <label htmlFor="remainingTime">Achieved
              <input
                type="text"
                id="remainingTime"
                name="remainingTime"
                disabled
                defaultValue="0"
              />
            </label>
          </section>

          <label style={{fontSize:'14px',marginLeft:'10px'}}>Resources</label>
          {fields.map((item, index) => (
            <div key={item.id} className={Style.link}>
              <TextField
                value={item.link}
                onChange={(e) => setValue(`resources.${index}.link`, e.target.value)}
                label={`Resource ${index + 1} Link`}
                variant="outlined"
                fullWidth
                className={Style.input}
                sx={{
                  fontSize: '12px',
                  '.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                    fontSize: '14px !important',
                    fontWeight: '500 !important',
                    '.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
                      border: 'none !important',
                      outline: 'none'
                    }
                  }
                }}
              />
              <IconButton onClick={() => remove(index)}>
                <RemoveCircleIcon />
              </IconButton>
            </div>
          ))}
          <IconButton onClick={() => append({ link: '' })} sx={{ borderRadius: '10px' }}>
            +<p style={{ fontSize: '14px' }}>Add resources</p>
          </IconButton>
        </section>
        <section  className={Style.notesection}>
          <label><FaPencilAlt /> Notes
            <textarea
              className={`${Style.edit} ${Style.textarea}`}
              name='notes'
              {...control.register('lessonProgress.0.notes')}
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
            style={{
              width: '80px'
            }}
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
