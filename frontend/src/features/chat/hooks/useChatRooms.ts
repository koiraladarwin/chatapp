import { useQuery } from '@tanstack/react-query';
import { resToUintArr } from '../../../utils/proto';
import { chat } from '../../../proto/chat';

export interface ChatRoomResponse {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
}

const getChatRooms = async (): Promise<ChatRoomResponse[]> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }

  const response = await fetch('http://localhost:4000/getchatrooms', {
    headers: {
      Authorization: `${token}`,
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

  const binary = await resToUintArr(response);
  const data = chat.ChatRoomList.deserializeBinary(binary)
  const chatRoomState: ChatRoomResponse[] = data.rooms.map((room) => {
    return { id: room.id.toString(), user_id: room.userId, name: room.name, created_at: "" }
  })
  return chatRoomState;
};

export const useGetChatRooms = () => {
  return useQuery<ChatRoomResponse[], Error>({
    queryKey: ['chat_rooms'],
    queryFn: getChatRooms,
    enabled: true,
  });
};

