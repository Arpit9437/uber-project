import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, MapPin, Wallet, Car } from 'lucide-react';

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const navigate = useNavigate();

  const handlePayment = () => {
    console.log('Processing payment...');
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Map Section */}
      <div className="h-screen w-screen">
        <img
          src="https://reactnativeexample.com/content/images/2018/09/grab-uber-map-location-picker.gif"
          alt="Live trip map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Home Button */}
      <Link 
        to="/home" 
        className="fixed right-4 top-4 h-12 w-12 bg-white shadow-lg flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors z-10"
      >
        <Home className="w-6 h-6 text-gray-700" />
      </Link>

      {/* Ride Details Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl">
        <div className="p-4">
          <div className="space-y-4">
            {/* Vehicle & Driver Info */}
            <div className="flex items-center gap-4 p-3 border-b">
              <div className="h-12 w-20 bg-gray-200 rounded flex items-center justify-center">
                <Car className="text-gray-600" size={32} />
              </div>
              <div>
                <h4 className="font-medium capitalize">
                  {ride?.captain?.fullname?.firstname || 'John'}
                </h4>
                <p className="text-sm text-gray-600">
                  {ride?.captain?.vehicle?.plate || 'XX XX XXXX'}
                </p>
              </div>
              <div className="ml-auto">
                <span className="text-lg font-semibold">
                  ₹{ride?.fare || '0'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Location Details */}
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Pickup</p>
                  <p className="font-medium">562/11-A</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">
                    {ride?.destination || 'Destination Address'}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center gap-3">
                <Wallet size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">Cash Payment</p>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button 
              onClick={handlePayment}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;