import { useNavigate } from "react-router-dom";
import { LucideLogOut } from "lucide-react";
import axios from "axios";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      localStorage.removeItem("token");
      localStorage.removeItem("captain");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md hover:bg-gray-100 transition-colors"
      aria-label="Logout"
    >
      <LucideLogOut />
    </button>
  );
};

export default LogoutButton;