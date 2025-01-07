import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email, password };
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/captains/login`, captain);

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-md mx-auto">
        <img 
          className="w-16 md:w-20 mb-8" 
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
          alt="Uber Logo" 
        />

        <h2 className="text-3xl font-bold mb-8">Welcome Back, Captain</h2>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Login Details</h3>
            <div className="relative mb-4">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                type="email"
                placeholder="Enter your email address"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-900 transition-colors text-lg"
          >
            Sign In as Captain
          </button>

          <p className="text-center text-gray-600">
            Want to join our fleet?{' '}
            <Link to="/captain-signup" className="text-black font-medium hover:underline">
              Register as a Captain
            </Link>
          </p>
        </form>

        <div className="mt-8 pt-8 border-t">
          <Link
            to="/login"
            className="block w-full py-4 text-center bg-[#d5622d] text-white rounded-lg font-medium hover:bg-[#c45827] transition-colors text-lg"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;