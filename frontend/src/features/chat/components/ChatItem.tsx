interface ChatItemProps {
  name: string;
  lastMessage: string;
}


export default function ChatItem({ name,lastMessage }: ChatItemProps) {
  return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-white text-lg font-semibold">{name}</span>
        </div>
        <span className="text-gray-400 text-sm">{lastMessage}</span>
      </div>
  );
}

