const express = require('express')
const app = express()
const http = require('http').createServer(app)
const {Server} = require('socket.io')
const io = new Server(http, {
  path: '/socket'
})
const {addUser, getUsers, deleteUser, addVoteToUser, restartVotes} = require('./models/users')



io.on('connection', (socket) => {
  console.log('A Client connected')

  socket.on('create', ({roomID}, callback) => {
    socket.join(roomID)
    callback()
  })

  socket.on('checkRoom', ({roomID}, callback) => {
    //Search if rooms exists
    if(!io.sockets.adapter.rooms.get(roomID)){return callback("Room doesn't exist")}
    callback()
  })

  socket.on('join', ({roomID, name}, callback) => {
    const {user, error} = addUser(socket.id, name, roomID)
    if (error) return callback(error)
    socket.join(user.roomID)
    io.in(user.roomID).emit('users', getUsers(user.roomID))
    callback()
  })

  socket.on('vote', score => {
    const user = addVoteToUser(socket.id, score)
    io.in(user.roomID).emit('users', getUsers(user.roomID))
    return
  })

  socket.on('restartVotes', roomID => {
    restartVotes(roomID)
    io.in(roomID).emit('users', getUsers(roomID))
    return
  })

  socket.on('setShowResult', ({roomID}) => {
    io.in(roomID).emit('showResult', true)
    return
  })

  socket.on('disconnect', () => {
    console.log('A Client disconnected with ID:', socket.id)
    const deletedUser = deleteUser(socket.id)
    console.log('Deleted user', deletedUser)
    if (deletedUser) return io.in(deletedUser.roomID).emit('users', getUsers(deletedUser.roomID))
  })
})


app.get('/api', (req, res) => {
  res.send({message: 'hola'})
})


if(process.env.NODE_ENV === 'production'){
  //Express will serve up production assets 
  //like our main.js or main.css
  app.use(express.static('client/build'));
  //Express will serve up the index.html file
  //if it doesnt recognize the route
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000

http.listen(PORT, () => console.log('Listening'));
