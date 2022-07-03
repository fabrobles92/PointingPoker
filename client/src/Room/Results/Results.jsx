import React from 'react'
import { Typography } from '@mui/material';

const calculateAverage = (users) => {
    const filteredList = users.filter( user => user.vote && user.vote !== '?')
    return filteredList.length ? (filteredList.reduce((a, b) => a + b.vote, 0) / filteredList.length).toFixed(2) : 0
}

function Results({users}) {
  return (
    <Typography variant="h3" component='div' marginBottom='15px' fontWeight='600' fontFamily='DM Sans' letterSpacing='-2px'
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
    </Typography>
  )
}

export default Results