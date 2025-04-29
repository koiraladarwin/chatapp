import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChatList from '../components/ChatList';
import MainChatScreen from '../components/ChatScreen';
import { useGetChatRooms } from '../hooks/useChatRooms';
import { Person } from '../models/chatModels';

export default function Chat() {
  const [chatRoomId, setChatRoomID] = useState<string>('default');
  const [persons, setPersons] = useState<Person[]>([]);
  const navigate = useNavigate();

  const {
    data,
    error,
    isLoading,
    isError,
  } = useGetChatRooms();

  useEffect(() => {
    // Redirect to login if token doesn't exist
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
      return;
    }

    if (isError) {
      console.error(error);
      navigate('/login');
      return;
    }

    if (!data) {
      console.log("no data")
    }

    if (data) {
      console.log(data)
      const formattedPersons = data.map((room) => ({
        name: "batman",
        id: room.id,
        lastMessage: room.created_at,
      }));

      setPersons(formattedPersons);
    }
  }, [data, error, isError, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {/* Chat List */}
      <ChatList persons={persons} setChatRoomID={setChatRoomID} />

      {/* Green Vertical Divider */}
      <div className="border-l border-gray-500 h-screen"></div>

      {/* Main Chat Screen */}
      <MainChatScreen chatRoomId={chatRoomId} />
    </div>
  );
}

