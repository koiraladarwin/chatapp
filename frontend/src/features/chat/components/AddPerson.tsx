
import React, { useState } from 'react';
import { useGetChatRooms } from '../hooks/useSearchPerson'; 

interface AddPersonProps {
  clicked: (name: string) => void;
  hide: () => void;
}

const AddPerson: React.FC<AddPersonProps> = ({ clicked, hide }: AddPersonProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: users = [], isLoading, isError } = useGetChatRooms(searchQuery);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-transparent">
      <div className="w-full max-w-md p-4 flex flex-col h-[40%] bg-gray-900 rounded-3xl shadow-2xl">
        {/* Close Button */}
        <div
          className="flex w-full justify-end text-xl text-gray-400 hover:text-white cursor-pointer"
          onClick={hide}
        >
          ✕
        </div>

        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="w-full p-3 text-white bg-gray-800 placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Spacer */}
        <div className="h-2" />

        {/* User List */}
        <div className="overflow-auto">
          {isLoading ? (
            <p className="text-gray-300">Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Error fetching users</p>
          ) : users.length > 0 ? (
            <ul className="space-y-2">
              {users.map((user) => (
                <div key={user.id} onClick={() => clicked(user.id)}>
                  <li className="p-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg shadow-sm cursor-pointer transition-colors duration-200">
                    {user.name}
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPerson;

