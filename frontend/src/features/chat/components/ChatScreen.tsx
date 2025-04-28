import { useState, useEffect, useRef } from "react";

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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fakeMessages = [];
    const people = ['Darwin', 'Person 123', 'Alice', 'Bob'];
    const messagesArray = [
      'Hello! How are you?',
      'I\'m good, thanks!',
      'Great to hear!',
      'What are you up to?',
      'Just working on a project, what about you?',
      'How is everything going?',
      'Have you seen that new show?',
      'What do you think of the new update?',
      'Let\'s catch up soon!'
    ];

    for (let i = 0; i < 20; i++) {
      const randomSender = people[Math.floor(Math.random() * people.length)];
      const randomMessage =
        messagesArray[Math.floor(Math.random() * messagesArray.length)];
      const isUser = randomSender === 'Darwin';

      fakeMessages.push({
        id: i + 1,
        sender: randomSender,
        text: randomMessage,
        isUser: isUser
      });
    }

    setMessages(fakeMessages);
  }, [chatRoomId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  const sendMessage = () => {
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
              {message.text}
            </div>
            <div ref={messagesEndRef}></div>
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
        ><div ref={messagesEndRef} />
          Send
        </button>
      </div>

    </div>
  );
}
