import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import { Person } from "../models/chatModels";
import MainChatScreen from "../components/ChatScreen";

export default function Chat() {
  const [chatRoomId, setChatRoomID] = useState<string>('default');
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    const newPerson: Person = {
      id: 'paras',
      name: 'New Person',
      lastMessage: 'Hi there!'
    };
    const newPerson2: Person = {
      id: 'darwin',
      name: 'New Person',
      lastMessage: 'Hi there!'
    };

    setPersons(prevPersons => [...prevPersons, newPerson]);
    setPersons(prevPersons => [...prevPersons, newPerson2]);
  }, []);

  return (
    <div className="flex">
      {/* Chat List */}
      <ChatList persons={persons} onSelectPerson={setChatRoomID} />

      {/* Main Chat Screen */}
      <MainChatScreen chatRoomId={chatRoomId} />
    </div>
  );
}

