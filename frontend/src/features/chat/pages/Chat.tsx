import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import { Person } from "../models/chatModels";
import MainChatScreen from "../components/ChatScreen";

export default function Chat() {
  const [chatRoomId, setChatRoomID] = useState<string>('default');
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    // Generate 1000 fake persons
    const fakePersons: Person[] = [];

    for (let i = 1; i <= 1000; i++) {
      fakePersons.push({
        id: `person-${i}`,
        name: `Person ${i}`,
        lastMessage: `Hello from person ${i}!`
      });
    }

    setPersons(fakePersons);
  }, []);
  return (
    <div className="flex">
      {/* Chat List */}
      <ChatList persons={persons} setChatRoomID={setChatRoomID} />

      {/* Green Vertical Divider */}
      <div className="border-l border-gray-500 h-screen"></div> {/* Ensuring proper vertical divider */}

      {/* Main Chat Screen */}
      <MainChatScreen chatRoomId={chatRoomId} />
    </div>
  );
}


