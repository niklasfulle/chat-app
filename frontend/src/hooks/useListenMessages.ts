import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

// Custom hook to listen for new messages from the Socket.IO server
const useListenMessages = () => {
  // Access the socket instance and conversation state
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  // Use the useEffect hook to set up and clean up the event listener
  useEffect(() => {
    // If the socket is available, set up a listener for the "newMessage" event
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        console.log("test")
        // Update the messages state with the new message
        setMessages([...messages, newMessage]);
      });
    }

    // Cleanup function to remove the event listener on component unmount
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, messages, setMessages]); // Dependency array ensures the effect runs when socket or messages change
};

export default useListenMessages;