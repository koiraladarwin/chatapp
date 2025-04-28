
import { useMutation } from '@tanstack/react-query';

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
  let Body = JSON.stringify(data)
  console.log(Body)

  const response = await fetch('http://localhost:4000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: Body
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

