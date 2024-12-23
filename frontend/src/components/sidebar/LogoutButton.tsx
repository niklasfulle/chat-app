import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <div
      className="flex flex-row mt-auto text-white transition-all duration-300 cursor-pointer group hover:text-red-600 eas-in "
      onClick={logout}
    >
      <LogOut className="w-6 h-6 mb-2 ml-2 md:ml-0 md:mb-0" />
      <div className="ml-4 font-bold text-md">
        {authUser?.firstname + " " + authUser?.lastname}
      </div>
    </div>
  );
};
export default LogoutButton;
