import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Car, Palette, Hash, Users, ChevronDown } from 'lucide-react';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');


  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/captains/register`, captainData);

    if (response.status === 201) {
      const data = response.data;
      localStorage.setItem('captain', JSON.stringify(data.captain));
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-md mx-auto">
        <img 
          className="w-16 md:w-20 mb-8" 
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
          alt="Uber Logo" 
        />

        <h2 className="text-3xl font-bold mb-8">Join Our Captain Network</h2>

        <form onSubmit={submitHandler} className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Details</h3>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Security</h3>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  type="text"
                  placeholder="Vehicle color"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
              </div>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  type="text"
                  placeholder="License plate number"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  type="number"
                  placeholder="Passenger capacity"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                />
              </div>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  required
                  className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors appearance-none cursor-pointer"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="" disabled>Choose vehicle type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto Rickshaw</option>
                  <option value="moto">Motorcycle</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-900 transition-colors text-lg"
          >
            Start Your Journey with Uber
          </button>

          <p className="text-center text-gray-600">
            Already driving with us?{' '}
            <Link to="/captain-login" className="text-black font-medium hover:underline">
              Sign in to your account
            </Link>
          </p>
        </form>

        <p className="text-xs text-gray-500 mt-8">
          This site is protected by reCAPTCHA and the{' '}
          <a href="#" className="underline hover:text-black transition-colors">Google Privacy Policy</a> and{' '}
          <a href="#" className="underline hover:text-black transition-colors">Terms of Service</a> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

