import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
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
      fullname:{
        firstname: formData.fullname.firstName,
        lastname: formData.fullname.lastName,
      },
      email: formData.email,
      password: formData.password,
    }

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, newUser);

    if(response.status === 201){
      const data = response.data;
      console.log(data);
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate("/home");
    }

    setFormData({
      fullname: { firstName: "", lastName: "" },
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="px-4 pt-8 pb-6">
        <div className="mb-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="uber logo"
            className="w-16 h-auto object-contain"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.fullname.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.fullname.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Terms and Privacy */}
          <div className="text-sm text-gray-600">
            By proceeding, you consent to get emails including by automated
            means, from Uber and its affiliates to the email address provided.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <Link to="/login" className="text-black font-medium">
            Already have an account? Sign in
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
