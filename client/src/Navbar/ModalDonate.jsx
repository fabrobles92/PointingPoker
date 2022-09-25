import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#D0E0EF',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  height: '100px'
  
};

const titleContainer = {
    display: 'flex',
    flexFlow: 'column',
    marginLeft: '15px',
    justifyContent: 'center'
}

export default function BasicModal({state, handleClose}) {
  return (
    <div>
      <Modal
        open={state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <img src='/img/Yo.jpg'/>
            <div style={titleContainer} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                I see you are enjoying this app
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Hagale un sinpesito a Fabri: 88588289 :)
                </Typography>
            </div>                
        </Box>
      </Modal>
    </div>
  );
}
