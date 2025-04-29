import { useEffect, useRef } from 'react';

export function useWebSocket(roomId: string, onMessage: (msg: MessageEvent) => void) {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socketUrl = `ws://localhost:4000/listen/${roomId}?token=${token}`;

    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = onMessage;

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [roomId, onMessage]);

  const sendMessage = (message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return { sendMessage };
}

