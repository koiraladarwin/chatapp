import { useQuery } from '@tanstack/react-query';

export interface ChatsData {
  id: string;
  sender_id: string;
  room_id: string;
  message: string;
  created_at: string;
}

const getChatsData = async (chatRoom: string): Promise<ChatsData[]> => {
  const token = localStorage.getItem('jwt');
  console.log("got upto here dude")
  if (!token) {
    throw new Error('No JWT token found');
  }

  const response = await fetch(`http://localhost:4000/getchats?roomid=${encodeURIComponent(chatRoom)}`, {
    headers: { Authorization: `${token}` }
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Session expired. Please log in again.');
    }
    throw new Error('Failed to fetch chat rooms.');
  }

  return response.json();
};



export const useGetChats = (chatRoom: string) => {
  return useQuery<ChatsData[]>({
    queryKey: ['chats', chatRoom],
    queryFn: () => getChatsData(chatRoom),
    enabled: true
  });
};

