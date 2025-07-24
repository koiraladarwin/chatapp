import { useState } from "react";
import { Person } from "../models/chatModels";
import ChatItem from "./ChatItem";

interface ChatListProps {
  persons: Person[];
  chatRoomId : string;
  setChatRoomID: (id: string) => void;
  openAddPerson: () => void;
}

export default function ChatList({ chatRoomId, persons, setChatRoomID, openAddPerson }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-3/12 max-md:w-2/12 flex flex-col bg-gray-900 p-2 gap-2 max-h-screen overflow-clip">

      {/* Header */}
      <div className="p-4 max-sm:hidden text-white text-3xl max-md:text-lg font-bold flex justify-between items-center max-md:flex-col max-md:gap-2 ">
        <div>Darwin Chat</div>
        <button
          onClick={openAddPerson}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-1.5 rounded-full text-sm shadow-md transition-all duration-200"
        >
          Add
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 max-md:hidden px-2">
        <input
          type="text"
          placeholder="Search or start new chat"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Persons List */}
      <div className="flex flex-col gap-2 overflow-y-auto pr-2 items-center" style={{ height: 'calc(100vh - 10px)' }}>
        {filteredPersons.map((person) => (
          <div
            key={person.id}
            onClick={() => setChatRoomID(person.id.toString())}
            className={person.id.toString()!==chatRoomId ? "flex gap-2  cursor-pointer p-2 w-full rounded-xl max-md:w-fit transition-colors duration-150":"bg-gray-700 flex gap-2  cursor-pointer p-2 w-full rounded-xl max-md:w-fit transition-colors duration-150"}
          >
            {/* Mobile view */}
            <div className=" flex items-center justify-center w-12 h-12 bg-cyan-600 text-white text-xl rounded-full">
              <SingleCircularList name={person.name} />
            </div>

            {/* Desktop view */}
            <div className="max-md:hidden">
              <ChatItem name={person.name} lastMessage={person.lastMessage} />
            </div>


          </div>
        ))}
      </div>
    </div>
  );
}

interface singleCircularListProps {
  name: string;
}

function SingleCircularList({ name }: singleCircularListProps) {
  return (
    <span>{name.substring(0, 1).toUpperCase()}</span>
  );
}






