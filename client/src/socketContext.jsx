import { createContext, useState} from "react";
import { io } from 'socket.io-client';

const socket = io('/', {
    path: '/socket'
  }) 

const SocketContext = createContext()  
  
const SocketProvider = ({children}) => {
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export  {SocketContext, SocketProvider}