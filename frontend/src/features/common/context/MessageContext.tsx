import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
  useState,
  cache,
} from 'react';

import { chat } from '../../../proto/chat';
import useJwt from '../hook/useGetId';

interface WebSocketContextType {
  isConnected: boolean;
  sendMessage: (message: chat.ChatMessage) => void;
  setOnMessage: (callback: (msg: chat.ChatMessage) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  let jwt: String = ""

  try {
    jwt = useJwt()
  } catch (e) {
    //go to login
  }

  const url = "http://localhost:4000/listen?jwt="+jwt

  const socket = useRef<WebSocket | null>(null);
  const messageHandler = useRef<(msg: any) => void>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');
    };

    socket.current.onmessage = (event) => {
      try {
        const data = new Uint8Array(event.data);
        const message = chat.ChatMessage.deserializeBinary(data);
        if (messageHandler.current) {

          messageHandler.current(message);
        }
      } catch (e) {
        console.error('Failed to parse message', e);
      }
    };

    socket.current.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.current?.close();
    };
  }, [url]);

  const sendMessage = (message: chat.ChatMessage) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      const binary = message.serializeBinary();
      socket.current.send(binary)
    } else {
      console.error('WebSocket is not open');
    }
  };

  const setOnMessage = (callback: (msg: chat.ChatMessage) => void) => {
    messageHandler.current = callback;
  };

  const value: WebSocketContextType = {
    isConnected,
    sendMessage,
    setOnMessage,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

