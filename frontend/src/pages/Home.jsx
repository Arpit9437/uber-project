import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitingForDriver from '../components/WaitingForDriver';
import LookingForDriver from '../components/LookingForDriver'; 

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [rideDetails, setRideDetails] = useState(null);
  const [vehicleFound, setVehicleFound] = useState(false); 

  const locationSuggestions = [
    '123 Main St, New York, NY',
    '456 Market St, San Francisco, CA',
    '789 Broad St, Chicago, IL',
  ];

  const handleLocationSelect = (location) => {
    if (!pickup) {
      setPickup(location);
    } else {
      setDestination(location);
      setIsSearchActive(false);
      setActivePanel('vehicle');
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActivePanel('confirm');
  };

  const handleConfirmRide = () => {
    setRideDetails({
      captain: {
        fullname: { firstname: 'John' },
        vehicle: { plate: 'AB 12 CD 3456' },
      },
      pickup: pickup,
      destination: destination,
      fare: selectedVehicle.price,
      otp: Math.floor(1000 + Math.random() * 9000),
    });
    setActivePanel('lookingForDriver');
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5 z-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Logo"
      />

      <div className="h-screen w-screen">
        <img
          src="https://reactnativeexample.com/content/images/2018/09/grab-uber-map-location-picker.gif"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={`fixed w-full transition-all duration-300 ease-in-out ${
          isSearchActive ? 'top-0 h-full bg-white' : 'bottom-0'
        }`}
      >
        <div className="bg-white rounded-t-3xl p-4">
          {isSearchActive && (
            <button
              onClick={() => setIsSearchActive(false)}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          )}

          <h4 className="text-xl font-semibold mb-4">Where to?</h4>

          <div className="space-y-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Pickup location"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Where to?"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
              />
            </div>

            {!isSearchActive && pickup && destination && (
              <button
                onClick={() => setActivePanel('vehicle')}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Find Trip
              </button>
            )}
          </div>

          {isSearchActive && (
            <LocationSearchPanel
              suggestions={locationSuggestions}
              onLocationSelect={handleLocationSelect}
            />
          )}
        </div>
      </div>

      {activePanel === 'vehicle' && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <VehiclePanel
            onClose={() => setActivePanel(null)}
            onVehicleSelect={handleVehicleSelect}
            fare={{ car: 199, moto: 49, auto: 99 }}
          />
        </div>
      )}

      {activePanel === 'confirm' && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <ConfirmRide
            onClose={() => setActivePanel('vehicle')}
            onConfirmRide={handleConfirmRide}
            pickup={pickup}
            destination={destination}
            selectedVehicle={selectedVehicle}
          />
        </div>
      )}

{activePanel === 'lookingForDriver' && (
  <div className="fixed bottom-0 left-0 right-0 z-20">
    <LookingForDriver
      pickup={pickup}
      destination={destination}
      // vehicleType={selectedVehicle?.type}
      selectedVehicle={selectedVehicle}
      setVehicleFound={setVehicleFound}
      setActivePanel={setActivePanel}
      onClose={() => setActivePanel('confirm')} 
    />
  </div>
)}

      {activePanel === 'waiting' && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <WaitingForDriver onClose={() => setActivePanel('confirm')} ride={rideDetails} />
        </div>
      )}
    </div>
  );
};

export default Home;
