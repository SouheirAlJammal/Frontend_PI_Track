import React, { useState } from 'react';
import { Modal, Button, TextField, IconButton } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styles from './LessonForm.module.css';
import axios from 'axios';
import { useUserStore } from '../../Store';

const LessonForm = ({ showModal, handleClose, getData, planId }) => {
  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: {
      resources: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'resources',
  });

  const [loading, setLoading] = useState(false);
  const { user } = useUserStore.getState();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await handleCreateLesson(data);
      handleClose();
      getData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function handleCreateLesson(data) {
    try {
      // Convert the time input to total minutes
      const totalMins = convertTimeToMinutes(data.totalTime);

      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}api/lessons/create`,
        {
          title: data.title,
          description: data.description,
          totalMins: totalMins,
          resources: data.resources,
          planId: planId,
        }
      );

      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Function to convert "HH:mm:ss" format to total minutes
  const convertTimeToMinutes = (time) => {
    const [hours, minutes, seconds] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
  };

  return (
    <Modal open={showModal} onClose={handleClose} style={{ width: '100%', height: '100%' }} className={styles.modal}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.title}>Create Lesson</h2>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                className={styles.input}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
                className={styles.input}
              />
            )}
          />

          <Controller
            name="totalTime"
            control={control}
            rules={{ required: 'Total Time is required' }}
            defaultValue="00:00:00"
            render={({ field }) => (
              <TextField
                {...field}
                label="Total Time (HH:mm:ss)"
                variant="outlined"
                fullWidth
                error={!!errors.totalTime}
                helperText={errors.totalTime?.message}
                className={styles.input}
              />
            )}
          />

          {fields.map((item, index) => (
            <div key={item.id} className={styles.link}>
              <TextField
                {...control.register(`resources.${index}`)}
                label={`Resource ${index + 1} Link`}
                variant="outlined"
                fullWidth
                className={styles.input}
              />
              <IconButton onClick={() => remove(index)}>
                <RemoveCircleIcon />
              </IconButton>
            </div>
          ))}

          <IconButton onClick={() => append('')} sx={{borderRadius:'10px'}}>
            <AddCircleIcon /> <p style={{fontSize:'16px'}}>Add resources</p>
          </IconButton>

          <Button type="submit" variant="contained" disabled={loading} className={styles.btn}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default LessonForm;
