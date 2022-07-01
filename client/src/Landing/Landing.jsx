import { useEffect, useContext, useState } from "react"
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import {Container,  Box, Button, Typography} from "@mui/material";
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { v4 as uuidv4 } from 'uuid';
import Input from "./Input";
import SnackbarMessage from "../Snackbar/SnackbarMessage";
import './Landing.css'


const validate = (values) => {
    const errors = {}

    if(!values.roomID.trim()){
        errors.roomID = 'Room ID required'
    }

    return errors
}


const Landing = ({socket}) => {
    const [message, setMessage] = useState({flag: null, message: null})
    const navigate = useNavigate()
    const {setUsers} = useContext(UserContext)

    useEffect(() => {
        socket.on('users', users => {
            setUsers(users)
        })
    
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setMessage(false);
    };

    
    const handleSubmitNew = () => {
        const roomID = uuidv4()
        socket.emit('create', {roomID} , error => {
            if(error){
                setMessage({flag: false, message: error})
                return
            }
            navigate('/'+ roomID)
        })
    }

    const handleSubmitJoin = ({roomID}) => {
        socket.emit('checkRoom', {roomID} , error => {
            if(error){
                setMessage({flag: false, message: error})
                return
            }
            navigate('/'+ roomID)
        })
    }

    
    return(
    <Container>
        <Typography variant="h1"component='div'marginBottom='15px' fontFamily='DM Sans' fontWeight='600' letterSpacing='-2px'
            sx={{
                fontSize: {xs: '4.5rem', sm: '6rem'}
            }}                                    
        >
            Pointing Poker
        </Typography>
        <Box component="div" noValidate autoComplete="off" 
            sx={{
                '& > :not(style)': { m: 1.5, },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row'},
                justifyContent: 'center',
                alignItems: { xs: 'center', sm: 'initial'},
                height: {sm:  '80px'}

            }}                        
        >
            <Button size="large" variant="contained" color="primary" sx={{marginRight: '15px', width: {xs: '25ch'}}} 
                onClick={handleSubmitNew}>
                Create Room
            </Button>
            <div className="separator"/>
            <Formik
                initialValues={{roomID: ''}}
                validate={validate}
                onSubmit= {handleSubmitJoin}>
                <Form className="form">
                    <Input placeholder="Join a Room" name='roomID'/>
                    <Button type="submit" sx={ { borderRadius: 100 , width: {xs:'12.5ch'}} } size="large" variant="contained" color='primary'>
                    <ArrowForwardTwoToneIcon sx={{fontSize: "25px"}}/>                    
                    </Button>
                </Form>
            </Formik>
        </Box>
        <SnackbarMessage state={message} handleClose={handleClose}/>
    </Container>

    )
  }

export default Landing