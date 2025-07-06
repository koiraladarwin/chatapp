import { useState } from "react";
import { Person } from "../models/chatModels";
import ChatItem from "./ChatItem";

interface ChatListProps {
  persons: Person[];
  setChatRoomID: (id: string) => void;
  openAddPerson: () => void;
}

export default function ChatList({ persons, setChatRoomID,openAddPerson }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-3/12 max-md:w-2/12 flex flex-col bg-gray-800 p-2 gap-2 max-h-screen">

      <div className="p-4 text-white text-3xl max-md:text-lg font-bold flex justify-between items-center max-md:flex-col max-md:gap-2">
        <div>
          Darwin Chat
        </div>
        <div onClick={openAddPerson}
        className="bg-cyan-700 hover:bg-cyan-700 text-white px-6 py-2 rounded-full text-sm">
          Add
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 max-md:hidden">
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
            onClick={() => setChatRoomID(person.id.toString())}
            className="bg-gray-700 hover:bg-gray-700 cursor-pointer p-2 rounded-lg"
          >
            <ChatItem name={person.name} lastMessage={person.lastMessage} />

          </div>
        ))}
      </div>
    </div>
  );
}

