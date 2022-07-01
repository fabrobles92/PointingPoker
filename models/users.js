const users = []

const addUser = (id, name, roomID) => {
    if (!name) return { error: "Username is required" }
    const user = {id, name, roomID, vote: null}
    users.push(user)
    return {user}
}

const getUser = () => {}

const getUsers = (roomID) => {
    return users.filter(user => user.roomID === roomID)
}

const deleteUser = (id) => {
    const index = users.findIndex( user => user.id === id)
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const addVoteToUser = (id, score) => {
    const index = users.findIndex( user => user.id === id)
    if(index !== -1){
        users[index]['vote'] = score
        return users[index]
    }
    
}

const restartVotes = (roomID) => {
    users.filter(user => user.roomID === roomID).forEach( user => user.vote = null)
}

module.exports = {addUser, getUser, getUsers, deleteUser, addVoteToUser, restartVotes}