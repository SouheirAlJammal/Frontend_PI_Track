// import React from 'react';
// import { Paper, Typography } from '@mui/material';

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
//     </Paper>
//   );
// };

// export default TaskEvent;


import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './TaskEvent.module.css';
import CardTask from '../../../components/CardTask/CardTask';

const TaskEvent = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD_TASK',  // Unique identifier for the draggable type
    item: { task },  // Data that will be passed to the drop target
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
console.log(task,'hellloooooooooooooooo')
  return (
    <div
      ref={drag}
      className={`${styles['ag-courses_item']} ${isDragging ? styles.dragging : ''}`}
    >
      <CardTask task={task}  />
    </div>
  );
};

export default TaskEvent;
