import { useQuery } from '@tanstack/react-query';

export interface ChatRoomResponse {
  id: string;
  created_at: string;
  user_ids: string[];
}

const getChatRooms = async (): Promise<ChatRoomResponse[]> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }

  const response = await fetch('http://localhost:4000/getchatrooms', {
    headers: {
      Authorization:`${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('jwt');
      throw new Error('Session expired. Please log in again.');
    }
    throw new Error('Failed to fetch chat rooms.');
  }

  return response.json();
};

export const useGetChatRooms = () => {
  return useQuery<ChatRoomResponse[], Error>({
    queryKey: ['chat_rooms'],
    queryFn: getChatRooms,
    enabled: true,
  });
};

