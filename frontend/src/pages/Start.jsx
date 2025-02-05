import { Link } from "react-router-dom"
const Start = () => {
  return (
    <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1695066584644-5453334ff5ac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex flex-col justify-between">
      <div className="pt-8 px-8">
        <img
          className="w-20 h-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber logo"
        />
      </div>
      <div className="bg-white p-8 rounded-t-3xl shadow-lg">
        <h2 className="text-4xl font-bold mb-6">Welcome to Uber</h2>
        <Link
          className="flex items-center justify-center w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          to="/login"
        >
          Continue
        </Link>
      </div>
    </div>
  )
}

export default Start

