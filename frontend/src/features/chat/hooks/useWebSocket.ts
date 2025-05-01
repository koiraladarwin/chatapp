import { useEffect, useRef } from 'react';
import { chat } from '../../../proto/chat'; // Adjust the import path

export function useWebSocket(
  roomId: string,
  onMessage: (message: chat.ChatMessage) => void
) {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socketUrl = `ws://localhost:4000/listen/${roomId}?token=${token}`;
    console.log(socketUrl)
    const socket = new WebSocket(socketUrl);
    socket.binaryType = 'arraybuffer'; // This is required for protobuf decoding
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = new Uint8Array(event.data);
        const message = chat.ChatMessage.deserializeBinary(data);
        onMessage(message);
      } catch (err) {
        console.error('Failed to decode protobuf message:', err);
      }
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [roomId, onMessage]);

  const sendMessage = (message: chat.ChatMessage) => {
    console.log("reached hook")
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const encoded = message.serializeBinary();

      // send encoded protobuf to backend whe you add photo supporrt

      socketRef.current.send(message.content)
    }
  };

  return { sendMessage };
}

