import { useQuery } from '@tanstack/react-query';

export interface PersonData {
  id: number;
  created_at: string;
  user_ids: string[];
}

const getPersonData = async (): Promise<PersonData[]> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }

  const response = await fetch('http://localhost:4000/getchatrooms', {
    headers: {
      Authorization:`${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      //localStorage.removeItem('jwt');
      throw new Error('Session expired. Please log in again.');
    }
    throw new Error('Failed to fetch chat rooms.');
  }

  return response.json();
};

export const useGetChatRooms = () => {
  return useQuery<PersonData[], Error>({
    queryKey: ['chat_rooms'],
    queryFn: getPersonData,
    enabled: true,
  });
};
