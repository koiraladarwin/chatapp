interface ChatItemProps {
  name: string;
  lastMessage: string;
}


export default function ChatItem({ name }: ChatItemProps) {
  return (
    <div className="px-4 py-3 mx-2 my-1 rounded-2xl bg-blue-500 cursor-pointer">
      <div className=" text-base font-medium truncate">{name}</div>
    </div>
  );
}

