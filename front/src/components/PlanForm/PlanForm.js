import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styles from './PlanForm.module.css';
import axios from 'axios';
import { useUserStore } from '../../Store';

const PlanForm = ({ showModal, handleClose, getData }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore.getState();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('submit', data)

    try {
      await handleCreatePlan(data);
      handleClose();
      getData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function handleCreatePlan(data) {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      // formData.append('image', data.image);

      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}api/plans/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
  return (
    <Modal open={showModal} onClose={handleClose} style={{ width: '100%', height: '100%' }} className={styles.modal}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.title}>Create Plan</h2>
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

          {/* <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div className={styles.fileUploadWrapperCustom} data-text={field.value ? field.value.name : 'Add background to your plan!'}>
                <input
                  {...field}
                  type="file"
                  className={styles.fileUploadFieldCustom}
                />
              </div>
            )}
          /> */}
          <Button type="submit" variant="contained" disabled={loading} className={styles.btn}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default PlanForm;
