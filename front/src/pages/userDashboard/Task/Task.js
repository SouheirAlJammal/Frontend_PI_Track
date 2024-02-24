// Task.js
import React, { useState, useEffect } from 'react';
import TaskHeader from '../../../components/taskHeader/TaskHeader';
import TaskStatus from '../../../components/taskStatus/TaskStatus';
import style from './Task.module.css';
import DashHead from '../../../components/DashHead/DashHead';
import axios from 'axios';
import SingleTask from './SingleTask';
import TaskForm from '../../../components/TaskForm/TaskForm';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTasks() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/tasks/`);
      if (response) {
        setTasks(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className={style.tasks}>
      <DashHead title="Your task management area" subtitle="make your day more organized" date={true} />
      <TaskHeader getData={getTasks} title="Task" subtitle="Start creating your tasks!" formComponent={TaskForm} />
      <section className={style.statusContainer}>
        <TaskStatus nbr={20} status="Pending" color="#EBD0C9" />
        <TaskStatus nbr={3} status="Completed" color="#C8DFE7" />
      </section>

      {loading ? (
        <div>Loadingggggggggg</div>
      ) : (
        <section className={style.tasksContainer}>
          {tasks.map((task, i) => (
            <SingleTask task={task} key={i} id={task._id} getTasks={getTasks} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Task;
