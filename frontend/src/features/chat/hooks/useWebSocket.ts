import { useEffect, useRef } from 'react';
import { chat } from '../../../proto/chat';
import { useWebSocket } from '../../common/context/MessageContext';

export function useChats(
  roomId: string,
  onMessage: (message: chat.ChatMessage) => void
) {
  const {sendMessage, setOnMessage } = useWebSocket();
  
  //const token = localStorage.getItem('jwt');
  //if (!token) {
  //  throw new Error('No JWT token found');
  //}

  //const socketRef = useRef<WebSocket | null>(null);
  setOnMessage((chat)=>{
    if(chat.room_id==roomId){
    onMessage(chat) 
    }
  })

  //useEffect(() => {
  //  const socketUrl = `ws://localhost:4000/listen/${roomId}?token=${token}`;
  //  console.log(socketUrl)
  //  const socket = new WebSocket(socketUrl);
  //  socket.binaryType = 'arraybuffer'; // This is required for protobuf decoding
  //  socketRef.current = socket;
  //
  //  socket.onopen = () => {
  //    console.log('WebSocket connected');
  //  };
  //
  //  socket.onmessage = (event) => {
  //    try {
  //      const data = new Uint8Array(event.data);
  //      const message = chat.ChatMessage.deserializeBinary(data);
  //      onMessage(message);
  //    } catch (err) {
  //      console.error('Failed to decode protobuf message:', err);
  //    }
  //  };
  //
  //  socket.onerror = (err) => {
  //    console.error('WebSocket error:', err);
  //  };
  //
  //  socket.onclose = () => {
  //    console.log('WebSocket disconnected');
  //  };
  //
  //  return () => {
  //    socket.close();
  //  };
  //}, [roomId, onMessage]);

  const sendMessagetoWebSocket = (message: chat.ChatMessage) => {
    sendMessage(message) 
  };

  return { sendMessageToContext: sendMessagetoWebSocket };
}


