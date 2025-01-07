import { useContext, useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLogin = {
      email: formData.email,
      password: formData.password
    };

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, userLogin);

    if(response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate("/home");
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-md mx-auto">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-16 md:w-20 mb-8"
        />

        <h2 className="text-3xl font-bold mb-8">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-black font-medium text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-900 transition-colors text-lg"
          >
            Sign In
          </button>

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-black font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto p-4">
            <Link
              to="/captain-login"
              className="block w-full py-4 text-center bg-[#10b461] text-white rounded-lg font-medium hover:bg-[#0ea054] transition-colors text-lg"
            >
              Sign in as Captain
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;