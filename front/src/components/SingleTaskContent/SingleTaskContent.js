import React, { useEffect, useState } from 'react';
import Style from './SingleTaskContent.module.css'
import axios from 'axios';
import { useUserStore } from '../../Store';

const SingleTaskContent = ({ taskId }) => {
    const { user, setUser } = useUserStore();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
        userId: user._id,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_ENDPOINT}api/tasks/update/${taskId}`,
                formData
            );
            if (response.status) {
                console.log('Task updated successfully');
                // You can add any logic or feedback for a successful update
            }
        } catch (error) {
            console.error('Error updating task:', error);
            // You can add logic or feedback for an unsuccessful update
        }
    };

    return (
        <>
            <article className={Style.article}>
                <section className={Style.section}>
                    <h3 className={Style.taskTitle}>Title</h3>
                    <div className={Style.edit}>
                        <input
                            type='text'
                            placeholder='Enter Task Title'
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <label>About this Task

                        <textarea className={`${Style.edit} ${Style.textarea}`}
                            placeholder='Enter Task Description'
                            name='description'
                            value={formData.description}
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
                            onChange={handleInputChange}>
                            <option value='Progress'>In Progress</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </label>

                    {/* <button
                        type='submit'
                        className={Style.submit}
                        onClick={handleSaveChanges}>
                        Save Changes
                    </button> */}
                </section>
            </article>
        </>
    );
};

export default SingleTaskContent;
