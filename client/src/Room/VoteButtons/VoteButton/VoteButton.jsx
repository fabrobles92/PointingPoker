import React from 'react'
import { Button } from '@mui/material';

function VoteButton({buttonInfo, handleVote}) {
  return (
    <Button key={buttonInfo.points} color='primary' size='medium' variant="contained" onClick={() => handleVote(buttonInfo.points)}>
        {buttonInfo.points}
    </Button>
  )
}

export default VoteButton