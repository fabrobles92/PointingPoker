import {useState} from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '../Landing/Input';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const validate = (values) => {
    const errors = {}
    if(!values.name.trim()){
        errors.name = 'Required'
    }
    return errors
}

export default function FormDialog({join}) {
  const [open, setOpen] = useState(true);

const handleSubmit = (values) => {
    setOpen(false)
    join(values.name)
}

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>What is your name?</DialogTitle>
        <DialogContent>
            <Formik
            initialValues={{name: ''}}
            validate={validate}
            onSubmit={handleSubmit}
            >
                <Form>
                    <Input
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                        name = 'name'
            />
                    <DialogActions>
                    <Button type='submit'>Enter</Button>
                    </DialogActions>
                </Form>
            </Formik>          
        </DialogContent>        
      </Dialog>
    </div>
  );
}
