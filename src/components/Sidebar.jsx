import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[20%] h-screen bg-gradient-to-b flex flex-col items-center from-gray-100 to-purple-600 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Orion</h2>
      <h3 className="text-md font-bold text-gray-800 mb-6">Performance Evaluator Agent</h3>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => navigate("/panel/dashboard")}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/panel/projects")}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
          >
            Projects
          </button>
        </li>
        <li>
          <a
            href="#section2"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
          >
            Section 2
          </a>
        </li>
        <li>
          <a
            href="#section3"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
          >
            Section 3
          </a>
        </li>
      </ul>
      <button 
        onClick={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_data");
          window.location.reload();
        }} 
        className="w-full mt-auto bg-red-600 text-white h-[40px] px-4 rounded hover:bg-red-700 cursor-pointer flex items-center justify-center"
      >Logout</button>
    </div>
  );
};

export default Sidebar;