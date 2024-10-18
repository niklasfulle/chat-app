import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation, { MessageType } from "../../zustand/useConversation";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
  const chatClass = fromMe ? "flex-row " : "items-end justify-end flex-row";
  const chatClass2 = fromMe ? "flex-row" : "flex-row-reverse";
  const chatClass3 = fromMe ? "" : "justify-end";

  const bubbleBg = fromMe ? "bg-blue-400" : "bg-green-400 text-black";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat mt-2 ${chatClass} flex flex-row `}>
      <div className={`flex gap-2 ${chatClass2}`}>
        <div className="hidden md:block chat-image avatar">
          <div className="w-6 rounded-full md:w-10">
            <img alt="Tailwind CSS chat bubble component" src={img} />
          </div>
        </div>
        <div className={`flex flex-col gap-0.5 `}>
          <p
            className={`chat-bubble text-white ${bubbleBg} ${shakeClass} text-sm md:text-md rounded-md p-2`}
          >
            {message.body}
          </p>
          <span
            className={`flex items-center gap-1 text-xs text-white opacity-50 chat-footer ${chatClass3}`}
          >
            {extractTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Message;
