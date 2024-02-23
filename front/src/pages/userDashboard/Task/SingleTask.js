import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CardTask from '../../../components/CardTask/CardTask'
import { CardActionArea } from '@mui/material';
import DashHead from '../../../components/DashHead/DashHead';
import style from './SingleTask.module.css'
import SingleTaskContent from '../../../components/SingleTaskContent/SingleTaskContent';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SingleTask({ task }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div onClick={handleClickOpen}>
        <CardTask task={task} />
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      
      >
        <AppBar sx={{ backgroundColor: 'rgb(7,28,53)', borderEndStartRadius: '10px',  borderEndEndRadius: '10px', width: '100%', margin: ' 0 auto',position:'relative',border:'none',height:'20vh',zIndex:'0' }}>
          {/* <Toolbar>
            <IconButton
              edge="start"
              color="red"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar> */}

          <Toolbar>
          <IconButton
              edge="start"
              color="red"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon  style={{backgroundColor:'white',borderRadius:'50%',width:'40px',height:'40px'}} />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              
            </Typography>
            <Button autoFocus onClick={handleClose} sx={{backgroundColor:' rgba(200,223,231,0.8)',color:'white'}}>
              Save Changes
            </Button>
            </Toolbar>
        </AppBar>
        {/* <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton>
        </List> */}
        <SingleTaskContent/>
      </Dialog>
    </React.Fragment>
  );
}

