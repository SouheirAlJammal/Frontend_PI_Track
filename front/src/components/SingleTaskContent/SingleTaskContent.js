import React, { useState } from 'react';
import Style from './SingleTaskContent.module.css'
import axios from 'axios';
import { useUserStore } from '../../Store';
import Button from '@mui/material/Button';

const SingleTaskContent = ({ id, task: { title, description, startDate, endDate, status }, onDeleteTask, getTasks }) => {
    const { user } = useUserStore();

    const [formData, setFormData] = useState({
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        status: status,
        userId: user._id,
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //delete deleteTask
    async function handleDeleteTask() {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_ENDPOINT}api/tasks/delete/${id}`
            );
            if (response) {
                console.log(response.data);
                onDeleteTask();
                getTasks();

            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleSaveChanges = async () => {
        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_ENDPOINT}api/tasks/update/${id}`,
                formData
            );
            if (response.status) {
                console.log('Task updated successfully');
                onDeleteTask()
                getTasks()
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <>
            <article className={Style.article}>
                <section className={Style.section}>
                    <h3 className={`${Style.edit} ${Style.taskTitle}`}>
                        <input
                            type='text'
                            name='title'
                            value={formData.title || ''}
                            onChange={handleInputChange}
                        />
                    </h3>

                    <label>About this Task

                        <textarea className={`${Style.edit} ${Style.textarea}`}
                            name='description'
                            value={formData.description || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <section className={Style.dateContainer}>
                        <label>Start Date

                            <input className={Style.edit}
                                type='date'
                                name='startDate'
                                value={formData.startDate}
                                onChange={handleInputChange}
                            />

                        </label>


                        <label>End Date

                            <input className={Style.edit}
                                type='date'
                                name='endDate'
                                value={formData.endDate}
                                onChange={handleInputChange}
                            />
                        </label>
                    </section>


                    <label>Update status

                        <select className={Style.edit}
                            name='status'
                            value={formData.status}
                            defaultValue={formData.status}
                            onChange={handleInputChange}>
                            <option value='Progress'>In Progress</option>
                            <option value='Completed'>Completed</option>
                            <option value='Pending'>Pending</option>

                        </select>
                    </label>
                    <footer className={Style.buttons}>
                        <Button autoFocus onClick={handleSaveChanges} sx={{ backgroundColor: 'rgb(7,28,53)', color: 'white' }}>
                            Save Changes
                        </Button>
                        <button style={{ backgroundColor: '#DA1D1D', padding: '10px', width: '80px', color: 'white', borderRadius: '5px', fontWeight: '500', cursor: 'pointer', border: 'none' }} onClick={handleDeleteTask}>
                            Delete
                        </button>
                    </footer>
                </section>
            </article>
        </>
    );
};

export default SingleTaskContent;
