import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.name || "Guest User"}
          </h1>
          <p className="text-gray-500 mb-1">{user?.email}</p>
          <p className="text-sm text-gray-400 mb-6">Welcome back 👋</p>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
