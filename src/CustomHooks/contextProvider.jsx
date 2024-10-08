import React, { useState,createContext, useContext, useEffect, useRef } from 'react';
import socketIo from 'socket.io-client';

const SocketContext = createContext();

export default function useSocket() {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
  //const socketRef = useRef();

  useEffect(() => {
    // Initialize socket only once
    const newSocket = socketIo(import.meta.env.VITE_SERVER_URL);
    setSocket(newSocket)

    return () => {
      newSocket.disconnect();  // Clean up when app closes
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
//export default useSocket;
