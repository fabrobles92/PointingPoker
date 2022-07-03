import { BrowserRouter, Route, Routes } from "react-router-dom"
import { io } from 'socket.io-client';
import './App.css';
import Landing from "./Landing/Landing";
import Room from "./Room/Room";
import ResponsiveAppBar from "./Navbar/Navbar";
import { SocketProvider } from "./socketContext";

const socket = io('/', {
  path: '/socket'
}) 


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ResponsiveAppBar/>
      <div className="App-header">
        <SocketProvider>
            <Routes>
              <Route path='/' element={<Landing />}/>
              <Route path='/:id' element={<Room />}/>
            </Routes>
        </SocketProvider>        
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
