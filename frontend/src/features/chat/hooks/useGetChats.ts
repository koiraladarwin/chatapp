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
  const protoData = chat.MessageModelList.deserializeBinary(buffer);

  let protoChats: ChatsData[] = protoData.messageModels.map((chatMessage) => {
    return {
      id: chatMessage.id,
      sender_id: chatMessage.sender_id,
      room_id: chatMessage.room_id,
      message: chatMessage.text,
      created_at: chatMessage.create_at,
    }
  })

  return protoChats;
}

export const useGetChats = (chatRoom: string) => {
  return useQuery<ChatsData[]>({
    queryKey: ['chats', chatRoom],
    queryFn: () => getChatsData(chatRoom),
    enabled: true
  });
};

