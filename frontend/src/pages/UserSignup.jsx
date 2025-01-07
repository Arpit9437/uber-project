import { useContext, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    fullname: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      setFormData((prevState) => ({
        ...prevState,
        fullname: {
          ...prevState.fullname,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: formData.fullname.firstName,
        lastname: formData.fullname.lastName,
      },
      email: formData.email,
      password: formData.password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setFormData({
      fullname: { firstName: "", lastName: "" },
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="w-full max-w-md px-6 py-12">
        <div className="mb-12 flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="uber logo"
            className="w-20 h-auto object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">Create an account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.fullname.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white shadow-sm transition-shadow hover:shadow-md"
                required
              />
            </div>
            <div className="flex-1 relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.fullname.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white shadow-sm transition-shadow hover:shadow-md"
                required
              />
            </div>
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white shadow-sm transition-shadow hover:shadow-md"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white shadow-sm transition-shadow hover:shadow-md"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
            By proceeding, you consent to get emails including by automated means,
            from Uber and its affiliates to the email address provided.
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            Sign Up
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="text-black font-medium hover:text-gray-700 transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;