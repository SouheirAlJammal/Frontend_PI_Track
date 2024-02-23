// TaskForm.jsx
import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './TaskForm.module.css';
import axios from 'axios';
import { useUserStore } from '../../Store';

const TaskForm = ({ showModal, handleClose ,getTasks}) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false); // Corrected initial state
  const { user } = useUserStore.getState();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    userId: user.id || '' // Adjusted the default value
  });

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      await handleAddTask(data);
      handleClose();
      getTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function handleAddTask(data) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}api/tasks/create`,
        { ...data }
      );
      if (response) {
        console.log(response.data);
        setNewTask({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          status: ''
        });
      }
    } catch (error) {
      console.log(error);
      throw error; }
  }

  return (
    <Modal open={showModal} onClose={handleClose} style={{ width: '100%', height: '100%' }} className={styles.modal}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.title}>Add Task</h2>
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
            name="startDate"
            control={control}
            rules={{ required: 'Start Date is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="Start Date"
                variant="outlined"
                fullWidth
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                className={styles.input}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            rules={{ required: 'End Date is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="End Date"
                variant="outlined"
                fullWidth
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                className={styles.input}
              />
            )}
          />

          <Button type="submit" variant="contained" disabled={loading} className={styles.btn}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default TaskForm;
