import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1695066584644-5453334ff5ac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full pt-8 flex justify-between flex-col">
      <img
        className="w-16 ml-8"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber logo"
      />
      <div className="bg-white pb-7 py-4 px-4">
        <h2 className="text-3xl font-bold">Welcome to Uber.</h2>
        <Link
          className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          to="/login"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
