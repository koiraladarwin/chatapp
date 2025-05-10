import { useMutation } from '@tanstack/react-query';
import { chat } from '../../../proto/chat';

const AddChatroom = async (data: string): Promise<null> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }
  const protoData =  new chat.AddChatRoomRequest({participant:data})
  const binary = protoData.serializeBinary();

  const response = await fetch('http://localhost:4000/addchatroom', {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/octet-stream',
    },
    body: binary,
  });

  if (!response.ok) {
    throw new Error('Couldnt Add User');
  }

  return null
};

export const useAddChatRoom = () => {
  return useMutation({
    mutationFn: AddChatroom,
  })
};

