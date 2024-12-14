import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

// Custom hook to fetch messages for a selected conversation
const useGetMessages = () => {
  // State variables for loading state and messages
  const [loading, setLoading] = useState(false);
  // Access state and actions from the useConversation zustand store
  const { messages, setMessages, selectedConversation } = useConversation();

  // useEffect hook to fetch messages when selectedConversation changes
  useEffect(() => {
    const getMessages = async () => {
      // Check if a conversation is selected before fetching
      if (!selectedConversation) return;

      // Set loading state to true to indicate data fetching
      setLoading(true);

      // Clear existing messages to prevent duplicate entries
      setMessages([]); // Assuming setMessages is a state update function

      try {
        // Fetch messages from the API endpoint for the selected conversation
        const res = await fetch(`/api/messages/${selectedConversation.id}`);
        const data = await res.json();

        // Handle potential errors in the API response
        if (!res.ok) {
          throw new Error(data.error || "An error occurred");
        }

        // Update the messages state with the fetched data
        setMessages(data);
      } catch (error: any) {
        // Display an error toast message if an error occurs
        toast.error(error.message);
      } finally {
        // Set loading state to false regardless of success or failure
        setLoading(false);
      }
    };

    // Call the getMessages function on initial render and whenever selectedConversation changes
    getMessages();
  }, [selectedConversation, setMessages]); // Dependency array ensures fetch on selection change

  // Return the loading state and messages data for use in the component
  return { messages, loading };
};

export default useGetMessages;