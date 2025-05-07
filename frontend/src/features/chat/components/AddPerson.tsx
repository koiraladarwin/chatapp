import React, { useState } from 'react';
import { useGetChatRooms } from '../hooks/useSearchPerson'; 

interface AddPersonProps {
  clicked: (name: string) => void;
  hide:()=>void;
}

const AddPerson: React.FC<AddPersonProps> = ({clicked,hide}:AddPersonProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Use the custom hook to fetch the chat rooms based on the debounced search query
  const { data: users = [], isLoading, isError } = useGetChatRooms(searchQuery);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-transparent">
      <div className="w-full max-w-md p-4 flex flex-col h-[40%] bg-gray-700 rounded-3xl">
        {/* Cross Icon */}
        <div className='flex w-[full] justify-end items-top text-xl text-red-800' onClick={hide}>
          X
        </div>

        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="w-full p-3 text-lg text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Spacer */}
        <div className='h-[10px]' />

        {/* User List */}
        <div className="overflow-auto">
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : isError ? (
            <p className="text-white">Error fetching users</p>
          ) : users.length > 0 ? (
            <ul className="space-y-4">
              {users.map((user) => (
                <div className='py-1' key={user.id} onClick={()=>{clicked(user.id)}}>
                  <li className="p-4 bg-cyan-600 rounded-lg shadow-md hover:bg-cyan-600 cursor-pointer">
                    {user.name}
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-white">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPerson;


