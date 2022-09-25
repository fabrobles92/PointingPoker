import { BrowserRouter, Route, Routes } from "react-router-dom"
import { io } from 'socket.io-client';
import './App.css';
import Landing from "./Landing/Landing";
import Room from "./Room/Room";
import ResponsiveAppBar from "./Navbar/Navbar";
import { UsersProvider } from "./userContext";

const socket = io('/', {
  path: '/socket'
}) 


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ResponsiveAppBar/>
      {/* <div className="App-header"> */}
        <UsersProvider>
            <Routes>
              <Route path='/' element={<Landing socket={socket}/>}/>
              <Route path='/:id' element={<Room socket={socket}/>}/>
            </Routes>
        </UsersProvider>        
      {/* </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
