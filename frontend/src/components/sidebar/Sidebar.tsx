import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="flex flex-col p-1 border-r border-slate-500 md:p-4 w-44 md:w-1/2 bg-slate-800 max-w-72">
      <SearchInput />
      <div className="px-3 divider" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
