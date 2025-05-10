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
  const loginSucess:LoginResponse = {jwt:""};
  const ProtoLoginInput = new auth.LoginDto({email:data.email,password:data.password})
  const reqBinary = ProtoLoginInput.serializeBinary()
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body:reqBinary,
  });

  if (!response.ok) {
    throw new Error('Wrong Email Or Password');
  }
  
  const resBinary = await response.arrayBuffer();
  const uInt8Array = new Uint8Array(resBinary);
  const resData = auth.LoginSucess.deserializeBinary(uInt8Array);
  loginSucess.jwt = resData.jwt; 
  return loginSucess;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.jwt);
    },
  })
};

