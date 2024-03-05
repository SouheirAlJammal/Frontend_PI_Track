// import React from 'react';


// const TaskEvent = ({ event }) => {
//   const { title, description, startDate, endDate, status } = event;

//   return (
//     <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor: status === 'Pending' ? '#ffecb3' : '#c8e6c9' }}>
//       <Typography variant="subtitle1" fontWeight="bold">
//         {title}
//       </Typography>
//       <Typography variant="body2">{description}</Typography>
//       <Typography variant="body2">
//         {new Date(startDate).toLocaleString()} - {new Date(endDate).toLocaleString()}
//       </Typography>
//       <Typography variant="body2">Status: {status}</Typography>
//     </Paper>      <CardTask task={task}  />
//   );
// };

// export default TaskEvent;


import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './TaskEvent.module.css';
// import CardTask from '../../../components/CardTask/CardTask';
import { Paper, Typography } from '@mui/material';
const TaskEvent = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD_TASK',
    item: { task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  console.log(task, 'hellloooooooooooooooo')
  return (
    <div
      ref={drag}
      className={`${styles['ag-courses_item']} ${isDragging ? styles.dragging : ''}`}
    >


      <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor:   task.status === 'Pending'
        ? 'rgba(226, 17, 157, 0.3)'
        : task.status === 'Progress'
        ? 'rgba(200,223,231,0.3)' 
        : 'rgba(83, 153, 83, 0.3)', }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {task.title}
        </Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body2">
          {new Date(task.startDate).toLocaleString()} - {new Date(task.endDate).toLocaleString()}
        </Typography>
        <Typography variant="body2">Status: {task.status}</Typography>
      </Paper>
    </div>
  );
};

export default TaskEvent;
