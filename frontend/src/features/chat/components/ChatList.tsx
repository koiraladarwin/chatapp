import { Person } from "../models/chatModels";
import ChatItem from "./ChatItem";

interface ChatListProps {
  persons: Person[];
  onSelectPerson: (id: string) => void;
}

export default function ChatList({ persons, onSelectPerson }: ChatListProps) {
  return (
    <div className="flex-1/6 flex flex-col gap-1">
      {persons.map((person) => (
        <div key={person.id} onClick={() => onSelectPerson(person.id)}>
          <ChatItem
            name={person.name}
            lastMessage={person.lastMessage}
          />
        </div>
      ))}
    </div>
  );
}
