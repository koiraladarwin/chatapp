
import { useState, useEffect } from "react";

interface MainChatScreenProps {
  chatRoomId: string;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  isUser: boolean;
}

export default function MainChatScreen({ chatRoomId }: MainChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const fakeMessages = [
      { id: 1, sender: 'Darwin', text: 'Hello! How are you?', isUser: true },
      { id: 2, sender: 'Person 123', text: 'I\'m good, thanks!', isUser: false },
      { id: 3, sender: 'Darwin', text: 'Great to hear!', isUser: true },
      { id: 4, sender: 'Person 123', text: 'What are you up to?', isUser: false },
      { id: 5, sender: 'Darwin', text: 'Just working on a project, what about you?', isUser: true },
      { id: 6, sender: 'Darwin', text: 'Hello! How are you?', isUser: true },
      { id: 7, sender: 'Person 123', text: 'I\'m good, thanks!', isUser: false },
      { id: 3, sender: 'Darwin', text: 'Great to hear!', isUser: true },
      { id: 4, sender: 'Person 123', text: 'What are you up to?', isUser: false },
      { id: 5, sender: 'Darwin', text: 'Just working on a project, what about you?', isUser: true },
      { id: 1, sender: 'Darwin', text: 'Hello! How are you?', isUser: true },
      { id: 2, sender: 'Person 123', text: 'I\'m good, thanks!', isUser: false },
      { id: 3, sender: 'Darwin', text: 'Great to hear!', isUser: true },
      { id: 4, sender: 'Person 123', text: 'What are you up to?', isUser: false },
      { id: 5, sender: 'Darwin', text: 'Just working on a project, what about you?', isUser: true },
      { id: 1, sender: 'Darwin', text: 'Hello! How are you?', isUser: true },
      { id: 2, sender: 'Person 123', text: 'I\'m good, thanks!', isUser: false },
      { id: 3, sender: 'Darwin', text: 'Great to hear!', isUser: true },
      { id: 4, sender: 'Person 123', text: 'What are you up to?', isUser: false },
      { id: 5, sender: 'Darwin', text: 'Just working on a project, what about you?', isUser: true },
      { id: 1, sender: 'Darwin', text: 'Hello! How are you?', isUser: true },
      { id: 2, sender: 'Person 123', text: 'I\'m good, thanks!', isUser: false },
      { id: 3, sender: 'Darwin', text: 'Great to hear!', isUser: true },
      { id: 4, sender: 'Person 123', text: 'What are you up to?', isUser: false },
      { id: 5, sender: 'Darwin', text: 'Just working on a project, what about you?', isUser: true },
      { id: 1, sender: 'Darwin', text: 'Hello! How are you?', isUser: true },
      { id: 2, sender: 'Person 123', text: 'I\'m good, thanks!', isUser: false },
      { id: 3, sender: 'Darwin', text: 'Great to hear!', isUser: true },
      { id: 4, sender: 'Person 123', text: 'What are you up to?', isUser: false },
      { id: 5, sender: 'Darwin', text: 'Just working on a project, what about you?', isUser: true },
    ];

    setMessages(fakeMessages);
  }, []);

  const sendMessage = () => {

    //this should be send to api and update it only after recieving it back from websockets
    if (inputMessage.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'Darwin',
        text: inputMessage,
        isUser: true
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex-10/12 flex flex-col bg-gray-900 max-h-screen">
      
      {/* Header */}
      <div className="p-4 bg-gray-800 text-white text-lg font-semibold">
        Chatting with: {chatRoomId}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 max-h-[calc(100vh-150px)]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`bg-${message.isUser ? 'cyan' : 'gray'}-700 text-white p-2 rounded-lg max-w-xs`}
            >
              <strong>{message.sender}: </strong>{message.text}
            </div>
          </div>
        ))}
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
        >
          Send
        </button>
      </div>

    </div>
  );
}
