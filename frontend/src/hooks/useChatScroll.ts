import { useEffect, useRef } from "react";

// Custom hook to automatically scroll to the bottom of a chat component
function useChatScroll(dep: any) {
  // Create a ref to store a reference to the chat container element
  const ref = useRef<HTMLElement>();

  // Use the useEffect hook to trigger the scroll behavior on dependency changes
  useEffect(() => {
    // Set a timeout to allow the DOM to update before scrolling
    setTimeout(() => {
      if (ref.current) {
        // Scroll the chat container to the bottom
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 100);
  }, [dep]);

  // Return the ref for use in the component
  return ref;
}

export default useChatScroll;