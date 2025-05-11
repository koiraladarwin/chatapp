import { useQuery } from '@tanstack/react-query';
import { resToUintArr } from '../../../utils/proto';
import { chat } from '../../../proto/chat';

export interface ChatsData {
  id: string;
  sender_id: string;
  room_id: string;
  message: string;
  created_at: string;
}

const getChatsData = async (chatRoom: string): Promise<ChatsData[]> => {
  const token = localStorage.getItem('jwt');

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
  const buffer = await resToUintArr(response);
  const data = chat.MessageModelList.deserializeBinary(buffer);

  const chats: ChatsData[] = data.messages.map((chat) => { return {id:chat.id,sender_id:chat.SenderId,room_id:chat.RoomId,message:chat.text,created_at:chat.CreatedAt.toString()} })
  return chats;
};



export const useGetChats = (chatRoom: string) => {
  return useQuery<ChatsData[]>({
    queryKey: ['chats', chatRoom],
    queryFn: () => getChatsData(chatRoom),
    enabled: true
  });
};

