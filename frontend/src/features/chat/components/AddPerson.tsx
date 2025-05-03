import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
}

const AddPerson: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
    { id: 5, name: 'Charlie White' },
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-transparent">
      <div className="w-full max-w-md p-4 flex flex-col h-[40%] bg-gray-700 rounded-3xl">
        {/*Cross Icon*/}
        <div className='flex w-[full] justify-end items-top text-xl text-red-800' >
          X
        </div>

        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="w-full p-3 text-lg  text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/*Spacer*/}
        <div className='h-[10px]' />

        {/* User List */}
        <div className="overflow-auto">
          {filteredUsers.length > 0 ? (
            <ul className="space-y-4">
              {filteredUsers.map((user) => (
                <div className='py-1'>
                  <li
                    key={user.id}
                    className=" p-4 bg-cyan-600 rounded-lg shadow-md hover:bg-cyan-600 cursor-pointer"
                  >
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
}
  ;

export default AddPerson;

