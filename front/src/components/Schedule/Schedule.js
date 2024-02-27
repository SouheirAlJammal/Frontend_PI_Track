import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import axios from "axios";
import style from "./Schedule.module.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Schedule = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTasks() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/tasks/`);
      if (response && response.data && response.data.data) {
        setTasks(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  const onEventResize = (data) => {
    const { start, end, event } = data;
    // Update the task with new start and end dates
    updateTask(event._id, { start, end });
  };

  const onEventDrop = (data) => {
    const { start, end, event } = data;
    // Update the task with new start and end dates
    updateTask(event._id, { start, end });
  };

  const updateTask = async (taskId, { start, end }) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_ENDPOINT}api/tasks/${taskId}`, {
        start,
        end,
      });

      if (response && response.data && response.data.data) {
        // Update tasks in the state with the modified task
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, start, end } : task
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.calendar}>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={tasks.map((task) => ({
          ...task,
          start: moment(task.startDate).toDate(),
          end: moment(task.endDate).toDate(),
        }))}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default Schedule;
