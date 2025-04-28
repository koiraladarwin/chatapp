import { useMutation } from '@tanstack/react-query';

interface LoginResponse {
  jwt: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const loginUser = async (data: LoginInput): Promise<LoginResponse> => {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Wrong Email Or Password');
  }

  return response.json();
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.jwt);
    },
  })
};

