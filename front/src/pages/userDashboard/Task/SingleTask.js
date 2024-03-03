import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CardTask from '../../../components/CardTask/CardTask'
import style from './SingleTask.module.css'
import styles from '../../../components/CardTask/CardTask.module.css'
import SingleTaskContent from '../../../components/SingleTaskContent/SingleTaskContent';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SingleTask({ task, id ,getTasks}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div onClick={handleClickOpen}  className={`${styles['ag-courses_item']} ${styles['even-bg']} `} >
        <CardTask task={task} id={id}  />
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          '.css-m9glnp-MuiPaper-root-MuiDialog-paper': {
            backgroundColor: '#F5F4F4 !important',
          }
        }}
      >
        <AppBar sx={{ backgroundColor: 'rgb(7,28,53)', borderEndStartRadius: '10px', borderEndEndRadius: '10px', width: '100%', margin: ' 0 auto', position: 'relative', border: 'none', height: '20vh', zIndex: '0' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              className={style.closeButton}
            >
              <CloseIcon style={{ color: 'rgb(7,28,53)', backgroundColor: 'rgb(247, 247, 247)' }} />

              <Typography sx={{ ml: 2, flex: 1, color: 'rgb(7,28,53)' }} variant="h6" component="div">
                Close
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <SingleTaskContent task={task} id={id} onDeleteTask={handleClose} getTasks={getTasks} />
      </Dialog>
    </React.Fragment>
  );
}

