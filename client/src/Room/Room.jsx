import { useEffect, useContext, useState, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from '@mui/material';
import StickyHeadTable from './Table';
import { UserContext } from '../userContext';
import FormDialog from './Dialog';
import SnackbarMessage from '../Snackbar/SnackbarMessage';
import ButtonClipboard from './ButtonClipboard';


import './Room.css'
const points = [
    {points: 0.5, value: 0.5},
    {points: 1, value: 1},
    {points: 2, value: 2},
    {points: 3, value: 3},
    {points: 4, value: 4},
    {points: 5, value: 5},
    {points: 6, value: 6},
    {points: '?', value: 0},
]



const Room = ({socket}) => {
    const [showResults, setShowResults] = useState(false)
    const [message, setMessage] = useState({flag: null, message: null})
    const [error, setError] = useState(true)
    const params = useParams();
    const navigate = useNavigate()
    const roomID = params.id
    const {users, setUsers} = useContext(UserContext)
    const myRef = useRef(null)

    const executeScroll = () => !myRef.current ? null : myRef.current.scrollIntoView({ behavior: "smooth" })    

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

    useEffect(()=> {
        if(showResults){
            executeScroll()
        }else{
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [showResults])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setMessage(false);
    };


    const join = (name) => {
        socket.emit('checkRoom', {roomID} , error => {
            if(error){
                console.log('Socket error', error)
                setMessage({flag: false, message: error})
                setError(false)
                return
                

            }
            
            socket.emit('join', {roomID, name} , error => {
                if(error){
                    console.log('Socket error', error)
                    setMessage({flag: false, message: error})
                    setError(false)
                    return
                    
                }
            })
        })
        }

    const handleVote = (score) => {
        socket.emit('vote', score)
    }
    
    const handleClear = () => {
        socket.emit('restartVotes', roomID)
    }

    const handleShow = () => {
        socket.emit('setShowResult', { roomID: roomID})
    }

    const calculateAverage = (users) => {
        const filteredList = users.filter( user => user.vote && user.vote !== '?')
        return filteredList.length ? (filteredList.reduce((a, b) => a + b.vote, 0) / filteredList.length).toFixed(2) : 0
    }
    return(
        <div className="App-header room-container">
            <Container component='div'>
                <FormDialog join={join}/>
                <Typography variant="h3" component='div' marginBottom='15px' fontFamily='DM Sans' letterSpacing='-2px' fontWeight='600'
                    sx={{
                        // fontSize: {xs: '2.5rem', sm: '4rem'},
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    {/* {error ? 'Room #: '+ params.id: 'Room does not exist'} */}
                    {error ? <ButtonClipboard/> : 'Room does not exist'}
                </Typography>

                
                { error && <Box sx={{display: 'flex', '& > *': {m: 1,}, flexFlow: 'column', justifyContent: 'center' }}>
                    <div className="container">
                        {points.map((buttonInfo) => (
                            <Button key={buttonInfo.points} color='primary' size='medium' variant="contained" onClick={() => handleVote(buttonInfo.points)}>
                                {buttonInfo.points}
                            </Button>
                        ))}
                    </div>
                    <div className='clear-show-group'>
                        <Button color='secondary' size='medium' variant="contained" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button color='secondary' size='medium' variant="contained" onClick={handleShow}>
                            Show
                        </Button>
                    </div>       
                    <StickyHeadTable socket={socket} users={users} showResults={showResults}/>                 
                    {showResults && <Typography ref={myRef} variant="h3" component='div' marginBottom='15px' fontWeight='600' fontFamily='DM Sans' letterSpacing='-2px'
                        sx={{
                            fontSize: {xs: '2rem', sm: '3.5rem'},
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            color: '#a8aeb2',                    
                        }}
                        >
                        Average: <label style={{color: 'black'}}>{calculateAverage(users)}</label>
                        {users.every( user => user.vote === users[0]['vote'] && user.vote !== '?') && 
                        <Typography fontWeight='600' sx={{fontSize: {xs: '1rem', sm: '2.5rem'}, color: 'rgb(54, 194, 54)'}}>
                            Consensus!
                        </Typography>}
                    </Typography>}
                </Box>
                }
                <SnackbarMessage state={message} handleClose={handleClose}/>
            </Container>
        </div>
    )
}


export default Room
