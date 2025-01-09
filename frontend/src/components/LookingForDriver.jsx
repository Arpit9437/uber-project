import React from 'react';
import { Loader2, X, User } from 'lucide-react';

const LookingForDriver = ({ pickup, destination, selectedVehicle, setActivePanel }) => {
  return (
    <div className="bg-white rounded-t-3xl p-6 shadow-lg animate-slideUp">
      {/* Close Button */}
      <button 
        className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={() => setActivePanel('confirm')}
        // () => setVehicleFound(false)
      >
        <X size={24} className="text-gray-500" />
      </button>

      {/* Header */}
      <div className="relative mb-8">
        <button 
          className="absolute left-1/2 -translate-x-1/2 -top-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setVehicleFound(false)}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </button>
        
        <div className="text-center mt-4">
          <h3 className="text-2xl font-semibold">Looking for a Driver</h3>
          <div className="flex items-center justify-center mt-2">
            <Loader2 className="animate-spin mr-2" size={20} />
            <p className="text-gray-600">Connecting you with a nearby driver</p>
          </div>
        </div>
      </div>

      {/* Profile Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
          <User size={48} className="text-gray-600" />
        </div>
      </div>

      {/* Ride Details */}
      <div className="space-y-4 bg-gray-50 rounded-xl p-4">
        {/* Pickup Location */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pickup</p>
            <p className="font-medium">{pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium">{destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-medium">₹</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estimated Fare</p>
            <p className="font-medium">₹{selectedVehicle.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;