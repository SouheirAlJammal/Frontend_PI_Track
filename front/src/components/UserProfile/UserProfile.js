import React, {  useState } from 'react';
import Style from './UserProfile.module.css';
import axios from 'axios';
import { useUserStore } from '../../Store';
import { toast } from 'react-toastify';
import DashHead from '../DashHead/DashHead';
import { Avatar } from '@mui/material';

const UserProfile = () => {
    const { user, setUser } = useUserStore();

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        DOB: user.DOB,
        description: user.description,
        id: user._id,
        image: user.image,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}api/users/upload`, formData);
            if (response.status === 200) {
                toast.success('Image uploaded successfully');
                setFormData((prevData) => ({
                    ...prevData,
                    image: response.data.imagePath,
                }));
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image');
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_ENDPOINT}api/users/${formData.id}/profile`, formData);
            if (response.status === 200) {
                toast.success('Your profile is updated');
                setUser(response.data.updatedUser);
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
            toast.error('Your profile is not updated');
        }
    };

    return (
        <div className={Style.profile}>
            <DashHead />
            <article className={Style.article}>
                <section className={Style.head}>
                    <Avatar alt={formData.username} src={formData.image} className={Style.userImage}>
                        {formData.username ? formData.username[0] : ''}
                    </Avatar>
                    <label className={Style.uploadPhotoLabel}>
                        Upload Image
                        <input type="file" accept="image/*" onChange={handleUploadImage} className={Style.uploadPhotoInput} />
                    </label>
                </section>
                <section className={Style.section}>
                    <label>Your Name</label>
                    <div className={Style.edit}>
                        <input
                            type='text'
                            placeholder='Enter Your UserName'
                            name="username"
                            value={formData.username}
                            defaultValue={formData.username || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <label>Email</label>
                    <div className={Style.edit}>
                        <input
                            type='email'
                            placeholder='Enter Your Email'
                            name="email"
                            value={formData.email}
                            defaultValue={formData.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    < label>Date of birthday</label>
                    <div className={Style.edit}>

                        <input
                            type='date'
                            placeholder='Enter Your D.O.B'
                            name="DOB"
                            value={formData.DOB}
                            onChange={handleInputChange} />
                    </div>

                    <label>About {user.username}</label>
                    <div className={Style.edit}>

                        <textarea
                            placeholder='Add description about yourself'
                            name="description"
                            value={formData.description}
                            defaultValue={formData.description || ''}
                            style={{
                                width: '95%', height: '80px', resize: 'none', padding: '10px', backgroundColor: 'rgb(236, 236, 236, 0.5)',
                                borderRadius: '10px'
                            }}
                            onChange={handleInputChange} />
                    </div>
                    <button type='submit' className={Style.submit} onClick={handleSaveChanges}> Save Changes</button>
                </section>
            </article>
        </div>
    );
};

export default UserProfile;
