'use client'
import { useParams } from "next/navigation";

export default function SingleChatPage() {
  const params = useParams();
  const chatId = params.chatId; 

  return (
    <div>
      <h1>Chat Room: {chatId}</h1>
    </div>
  );
}
