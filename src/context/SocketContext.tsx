import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

type OwnProps = {
  children: React.ReactNode;
};

export const SocketProvider = ({ children }: OwnProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

    if (!socketUrl) {
      alert('No Socket URL please check env');

      return;
    }

    const newSocket = io(socketUrl);
    setSocket(newSocket);

    // Clean up the socket on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context.socket;
};
