import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChatList from '../components/ChatList';
import ChatScreen from '../components/ChatScreen';
import { useGetChatRooms } from '../hooks/useChatRooms';
import { Person } from '../models/chatModels';
import AddPerson from '../components/AddPerson';
import { useAddChatRoom } from '../hooks/useAddChatRoom';

export default function Chat() {
  const [chatRoomId, setChatRoomID] = useState<string>('None');
  const [chatRoomName, setChatRoomName] = useState<string>('None');
  const [persons, setPersons] = useState<Person[]>([]);
  const [addPersonScreen, setAddPersonScreen] = useState<Boolean>(false)
  const { mutate } = useAddChatRoom();
  const navigate = useNavigate();

  const {
    data,
    error,
    isLoading,
    isError,
    refetch
  } = useGetChatRooms();

  function addChatRoom(name: string) {
    mutate(name, {
      onSuccess: () => {
        setAddPersonScreen(false)
        refetch()
      }
    })
  }


  useEffect(() => {
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
        name: room.name,
        id: room.id,
        lastMessage: room.lastMessage,
      }));

      setPersons(formattedPersons);
    }
  }, [data, error, isError]);

  if (isLoading) {
    return <div className='bg-gray-900 h-[100vh] text-white flex w-[100vw] justify-center items-center'>Loading...</div>;
  }


  return (
    <div className="flex relative w-full">
      {/*Add Person */}

      {addPersonScreen &&
        <div className="absolute w-screen h-screen flex z-1">
          <AddPerson clicked={addChatRoom} hide={() => { setAddPersonScreen(false) }} />
        </div>

      }

      {/* Chat List */}
      <ChatList chatRoomId={chatRoomId} persons={persons} setChatRoomID={setChatRoomID} setChatRoomName={setChatRoomName} openAddPerson={() => {
        setAddPersonScreen(true)
      }} />

      {/* Gray Vertical Divider */}
      <div className="border-l border-gray-500 h-screen"></div>

      {/* Main Chat Screen */}
      
      <ChatScreen chatRoomId={chatRoomId}  chatRoomPersonName={chatRoomName}/>
    </div>
  );
}

