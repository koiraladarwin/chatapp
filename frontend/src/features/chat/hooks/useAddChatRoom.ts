import { useMutation } from '@tanstack/react-query';

interface AddChatInput {
  participant: string;
}

const AddChatroom = async (data: string): Promise<null> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }
  const requestData: AddChatInput = { participant: data }
  console.log(data)
  const response = await fetch('http://localhost:4000/addchatroom', {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
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

