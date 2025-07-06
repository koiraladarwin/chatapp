import { useState, useEffect, useRef, useCallback } from "react";
import { useChats } from "../hooks/useWebSocket";
import { chat } from "../../../proto/chat";
import { useGetChats } from "../hooks/useGetChats";
import useJwt from "../../common/hook/useGetId";

interface MainChatScreenProps {
  chatRoomId: string;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function ChatScreen({ chatRoomId }: MainChatScreenProps) {
  const id = useJwt()
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const { isSuccess, data: chats = [] } = useGetChats(chatRoomId)
  const userId = useJwt();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("this is chats from ui")
    console.log(chats)
    console.log("this is also chats from ui")
    if (isSuccess && chats.length > 0) {
      const storedMessages: Message[] = chats.map((chat) => ({
        id: parseInt(chat.id),
        text: chat.message,
        isUser: chat.sender_id == userId
      }));
      setMessages(storedMessages.reverse());
    }
  }, [chats]);

  const handleIncomingMessage = useCallback((message: chat.ChatMessage) => {
    const newMessage: Message = {
      //messages.legth + 1 is just hacky and not good practise i guess
      id: messages.length + 1,
      text: message.content,
      isUser: message.user_id == userId
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);


  const { sendMessageToContext } = useChats(chatRoomId, handleIncomingMessage);

  const sendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }
    const message = new chat.ChatMessage({
      type: chat.MessageType.TEXT,
      content: inputMessage.trim(),
      user_id: id,
      room_id:chatRoomId,
      timestamp: Date.now(),
    })
    sendMessageToContext(message);
    setInputMessage("")
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <div className="w-9/12 max-md:w-10/12 flex flex-col bg-gray-900 max-h-screen">
      {/* Header */}
      <div className="p-4 bg-gray-800 text-white text-lg font-semibold">
        Chatting with: {chatRoomId}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 max-h-[calc(100vh-150px)] break-all">
        {messages.map((message) => {
          console.log(message)
          return (<div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`${message.isUser ? 'bg-blue-700' : 'bg-gray-700'
                } text-white p-2 rounded-lg max-w-xs`}            >
              {message.text}
            </div>
            <div ref={messagesEndRef}></div>
          </div>)
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full"
        ><div ref={messagesEndRef} />
          Send
        </button>
      </div>

    </div>
  );
}
