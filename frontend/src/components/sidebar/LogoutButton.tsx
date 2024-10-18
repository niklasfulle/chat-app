import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <div className="mt-auto">
      <LogOut
        className="w-6 h-6 mb-2 ml-2 text-white transition-all duration-300 cursor-pointer md:ml-0 md:mb-0 hover:text-red-600 eas-in"
        onClick={logout}
      />
    </div>
  );
};
export default LogoutButton;
