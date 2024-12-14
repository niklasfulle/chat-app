import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = selectedConversation?.id === conversation.id;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(conversation.id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 rounded-full md:w-12">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-3">
            <p className="text-sm font-bold text-gray-200 md:text-md">
              {conversation.firstname + " " + conversation.lastname}
            </p>
          </div>
        </div>
      </div>

      <div className="h-1 py-0 my-0 divider" />
    </>
  );
};
export default Conversation;
