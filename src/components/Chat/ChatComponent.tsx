import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);

  useEffect(() => {
    socket.on('chat message', msg => {
      setChatLog(prevLog => [...prevLog, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <div>
      <div>
        {chatLog.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
