import { useState } from "react";
import { Person } from "../models/chatModels";
import ChatItem from "./ChatItem";

interface ChatListProps {
  persons: Person[];
  setChatRoomID: (id: string) => void;
}

export default function ChatList({ persons, setChatRoomID }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-4/12 flex flex-col bg-gray-800 p-2 gap-2 max-h-screen">

      <div className="p-4 bg-gray-800 text-white text-3xl font-bold ">
        Darwin Chat
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search or start new chat"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Persons List */}
      <div className="flex flex-col gap-1 overflow-y-auto pr-2" style={{ height: 'calc(100vh - 10px)' }}>
        {filteredPersons.map((person) => (
          <div
            key={person.id}
            onClick={() => setChatRoomID(person.id)}
            className="hover:bg-gray-700 cursor-pointer p-2 rounded-lg"
          >
            <ChatItem name={person.name} lastMessage={person.lastMessage} />

          </div>
        ))}
      </div>
    </div>
  );
}

