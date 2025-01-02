import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 px-4 pt-8 pb-20">
        <div className="mb-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="uber logo"
            className="w-16 h-auto object-contain"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email/Phone Input */}
          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base"
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
              className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12 text-base"
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

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-black font-medium text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-6 text-base"
          >
            Sign in
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <Link
            to="/captain-signup"
            className="text-black font-medium text-base hover:underline"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </main>

      {/* Sign in as Captain Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="px-4 py-4">
          <Link
            to="/login"
            className="block w-full py-3.5 text-center bg-[#10b461] text-white rounded-lg font-medium hover:bg-[#0ea054] transition-colors text-base"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
