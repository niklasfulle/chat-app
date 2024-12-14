import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Custom hook to fetch and manage conversations
const useGetConversations = () => {
  // State for loading indicator and conversation data
  const [loading, setLoading] = useState(false); // Indicates whether data is being fetched
  const [conversations, setConversations] = useState<ConversationType[]>([]); // Stores fetched conversations

  // Use the useEffect hook to fetch conversations on component mount
  useEffect(() => {
    const getConversations = async () => {
      // Set loading state to true to display a loading indicator
      setLoading(true);

      try {
        // Fetch conversation data from the API endpoint
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();

        // Handle potential errors from the API response
        if (data.error) {
          throw new Error(data.error);
        }

        // Set the fetched conversations in the state
        setConversations(data);
      } catch (error: any) {
        // Display an error toast message
        toast.error(error.message);
      } finally {
        // Set loading state to false to hide the loading indicator
        setLoading(false);
      }
    };

    // Call the `getConversations` function to initiate the fetch
    getConversations();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Return the loading state and conversations data
  return { loading, conversations };
};

export default useGetConversations;