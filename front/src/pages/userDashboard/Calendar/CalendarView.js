import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TaskEvent from './TaskEvent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import style from './CalendarView.module.css';

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/tasks/`);
        if (response && response.data) {
          setEvents(response.data.data.map(event => ({ ...event, id: event.id })));
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    getEvents();
  }, []);

  const handleEventClick = event => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const onEventDrop = async ({ event, start, end }) => {
    const updatedEvent = { ...event, startDate: start, endDate: end };

    try {
      const response = await axios.patch(`${process.env.REACT_APP_ENDPOINT}api/tasks/update/${event.id}`, updatedEvent);

      if (response && response.data) {
        const updatedEvents = events.map((ev) => (ev.id === event.id ? response.data.data : ev));
        setEvents(updatedEvents);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box height="100vh" className={style.calendar} >
     <DndProvider backend={HTML5Backend}>
  <DnDCalendar
    onEventDrop={onEventDrop}
    localizer={localizer}
    events={events}
    startAccessor="startDate"
    endAccessor="endDate"
    views={['month', 'week', 'day','agenda']}
    onSelectEvent={handleEventClick}
    components={{
      event: (eventProps) => <TaskEvent task={eventProps.event} />,
    }}
    draggableAccessor={(event) => true}
  />
</DndProvider>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <Typography>{selectedEvent?.description}</Typography>
          <Typography>
            {new Date(selectedEvent?.startDate).toLocaleString()} -{' '}
            {new Date(selectedEvent?.endDate).toLocaleString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>5
      </Dialog>
    </Box>
  );
};

export default CalendarView;
