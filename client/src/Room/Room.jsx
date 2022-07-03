import { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from '@mui/material';
import { SocketContext } from '../socketContext';
import StickyHeadTable from './Table';
import FormDialog from './Dialog';
import VoteButtons from './VoteButtons/VoteButtons';
import ClearShowButtons from './ClearShowButtons/ClearShowButtons';
import Results from './Results/Results';

const Room = () => {
    const socket = useContext(SocketContext)
    const [users, setUsers] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [roomExists, setRoomExists] = useState(true)
    const params = useParams().id;
    const roomID = params.id

    useEffect(() => {
        socket.on('users', users => {
            setUsers(users)
        })

        socket.on('showResult', boolean => {
            setShowResults(boolean)
        })
    }, [])


    useEffect(() => {
        if(users.length && users.every( user => user.vote)){
            setShowResults(true)
            return
        }
        setShowResults(false)
    }, [users])


    const join = (name) => {
        socket.emit('checkRoom', {roomID} , error => {
            if(error){
                console.log('Socket error', error)
                setRoomExists(false)
                return
                

            }
            
            socket.emit('join', {roomID, name} , error => {
                if(error){
                    console.log('Socket error', error)
                    setRoomExists(false)
                    return
                    
                }
            })
        })
        }

 
    return(
        <Container component='div'>
            <FormDialog join={join}/>
            <Typography variant="h3" component='div' marginBottom='15px' fontFamily='DM Sans' letterSpacing='-2px' fontWeight='600'
                sx={{
                    fontSize: {xs: '2.5rem', sm: '4rem'},
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {roomExists ? 'Room #: '+ params.id: 'Room does not exist'}
            </Typography>
            
            { roomExists && 
            <Box sx={{display: 'flex', '& > *': {m: 1,}, flexFlow: 'column', justifyContent: 'center' }}>
                <VoteButtons socket={socket}/>
                <ClearShowButtons socket={socket}/>
                <StickyHeadTable socket={socket} users={users} showResults={showResults}/>                 
                {showResults && <Results users={users}/>}
            </Box>
            }
        </Container>
    )
}


export default Room
