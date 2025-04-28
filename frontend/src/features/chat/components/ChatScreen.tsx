interface MainChatScreenProps {
  chatRoomId: string;
}

export default function MainChatScreen({ chatRoomId }: MainChatScreenProps) {
  return (
    <div className="flex-5/6">
      {chatRoomId}
    </div>
  );
}
