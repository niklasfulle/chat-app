import useConversation from "../../zustand/useConversation";
import { MessageCircle } from "lucide-react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex flex-col w-full bg-slate-800">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="flex flex-row items-center gap-2 px-4 py-2 mb-2 bg-slate-500">
            <img
              src={selectedConversation.profilePic}
              alt="user avatar"
              className="w-8 h-8"
            />
            <span className="font-bold text-gray-900">
              {selectedConversation.firstname +
                " " +
                selectedConversation.lastname}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-row items-center gap-2 px-4 font-semibold text-center text-gray-200 sm:text-lg md:text-xl">
        <p>Chat auswählen, um eine Nachricht zu senden</p>
        <MessageCircle className="text-3xl text-center md:text-6xl" />
      </div>
    </div>
  );
};
