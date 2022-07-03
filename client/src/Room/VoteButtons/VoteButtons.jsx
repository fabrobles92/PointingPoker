import React from 'react'
import VoteButton from './VoteButton/VoteButton'
import './VoteButtons.css'

const points = [
    {points: 0.5},
    {points: 1},
    {points: 2},
    {points: 3},
    {points: 4},
    {points: 5},
    {points: 6},
    {points: '?'},
]



function VoteButtons({ socket }) {

    const handleVote = (score) => {
        socket.emit('vote', score)
    }

    return (
    <div className="container">
        {points.map((buttonInfo) => (
            <VoteButton key={buttonInfo.points} buttonInfo={buttonInfo} handleVote={handleVote}/>
        ))}
    </div>
)
}

export default VoteButtons