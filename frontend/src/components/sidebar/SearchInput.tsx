import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error(
        "Der Suchbegriff muss mindestens 3 Zeichen lang sein."
      );
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.firstname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("Kein Benutzer gefunden!");
  };

  return (
    <form className="flex items-center gap-1 md:gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Suche..."
        className="w-full p-1 pl-2 md:p-2 md:pl-4 rounded-xl input-sm md:input input-bordered border-[1px] border-black "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 text-white transition-all duration-300 rounded-xl btn md:btn-md btn-sm btn-circle bg-sky-500 hover:bg-sky-600 eas-in active:bg-sky-700 border-[1px] border-white"
      >
        <Search className="w-4 h-4 outline-none md:w-6 md:h-6" />
      </button>
    </form>
  );
};
export default SearchInput;
