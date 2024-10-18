import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex w-full h-full overflow-hidden bg-opacity-0 shadow-lg bg-slate-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
