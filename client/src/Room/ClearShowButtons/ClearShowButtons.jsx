import React from 'react'
import { Button } from '@mui/material';
import { useParams } from "react-router-dom";
import './ClearShowButtons.css'


function ClearShowButtons({socket}) {
    const params = useParams();
    const roomID = params.id

    const handleClear = () => {
        socket.emit('restartVotes', roomID)
    }

    const handleShow = () => {
        socket.emit('setShowResult', { roomID: roomID})
    }

    return (
    <div className='clear-show-group'>
        <Button color='secondary' size='medium' variant="contained" onClick={handleClear}>
            Clear
        </Button>
        <Button color='secondary' size='medium' variant="contained" onClick={handleShow}>
            Show
        </Button>
    </div>  
)
}

export default ClearShowButtons