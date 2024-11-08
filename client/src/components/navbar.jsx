import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleProgress = () => {
    navigate("/progress");
  };
  return (
    <div className="flex flex-col gap-10  items-center p-10">
      <div>
        <p className="text-lime-300 text-4xl font-bold">Gym Tracker</p>
      </div>
      <div className="flex flex-row gap-10">
        <button
        onClick={handleDashboard}
          type="button"
          className="rounded-full bg-lime-400 px-8 py-5 w-40 text-l font-semibold text-black shadow-sm hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
        >
          Dashboard
        </button>

        <button
        onClick={handleProgress}
          type="button"
          className="rounded-full bg-lime-400 px-8 py-3 w-40 text-l font-semibold text-black shadow-sm hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
        >
          Progress
        </button>
      </div>
    </div>
  );
}
