
import { useMutation } from '@tanstack/react-query';
import { auth } from '../../../proto/auth';

interface SignupResponse {
  status: string;
}

interface SignupInput {
  Name: string;
  Age: number;
  Email: string;
  Password: string;
}

const signupUser = async (data: SignupInput): Promise<SignupResponse> => {
  //i hate javascript 
  data.Age = Number(data.Age)
  //why are we converting a number to number? Welcome to typescript land

  const protoData = new auth.SignUpDto({
    name: data.Name,
    age: data.Age,
    email: data.Email,
    password: data.Password
  })

  const binary = protoData.serializeBinary();

  const response = await fetch('http://localhost:4000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: binary
  });


  if (!response.ok) {
    const rawResponse = await response.text();
    console.log("Raw Response: ", rawResponse);
    throw Error("Account Already Exists")
  }

  return { status: "sucess" }
};

export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupInput>({
    mutationFn: signupUser,
  });
};

