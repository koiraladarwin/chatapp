interface ChatItemProps {
  name: string;
  lastMessage: string;
}


export default function ChatItem({ name, lastMessage }: ChatItemProps) {
  let truncatedMessage = "";

  if (lastMessage) {
    const words = lastMessage.trim().split(/\s+/);
    const isLong = words.length > 12 || lastMessage.length > 12;

    if (isLong) {
      truncatedMessage = words.slice(0, 12).join(" ");
      if (truncatedMessage.length > 12) {
        truncatedMessage = truncatedMessage.slice(0, 12);
      }
      truncatedMessage += "...";
    } else {
      truncatedMessage = lastMessage;
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <span className="text-white text-lg font-semibold">{name}</span>
      </div>
      <span className="text-gray-400 text-sm max-md:hidden">{truncatedMessage}</span>
    </div>
  );
}

