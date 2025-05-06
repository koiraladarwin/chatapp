import { useMutation } from '@tanstack/react-query';
import { auth } from '../../../proto/auth';

interface LoginResponse {
  jwt: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const loginUser = async (data: LoginInput): Promise<LoginResponse> => {
  const ProtoLoginInput = new auth.LoginDto({email:data.email,password:data.password})
  const binary = ProtoLoginInput.serializeBinary()
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body:binary,
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

