import { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import LocationSearchPanel from '../components/LocationSearchPanel';

const Home = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Map Section */}
      <div className="h-screen w-screen">
        <img
          src="https://reactnativeexample.com/content/images/2018/09/grab-uber-map-location-picker.gif"   
          alt="Map"
          className="w-full h-full object-cover"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
          className="w-12 absolute left-4 top-4"
        />
      </div>

      {/* Search Panel */}
      <div 
        className={`flex flex-col w-full absolute transition-all duration-300 ease-in-out ${
          isSearchActive ? 'top-0 h-screen bg-white' : 'bottom-0'
        }`}
      >
        <div className={`bg-white ${!isSearchActive && 'rounded-t-3xl'} shadow-lg`}>
          <div className="p-4">
            {isSearchActive && (
              <button
                onClick={() => setIsSearchActive(false)}
                className="absolute right-4 top-4"
              >
                <X size={24} />
              </button>
            )}
            
            <h4 className="text-xl font-semibold mb-3">Find a trip</h4>
            
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative mb-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Add a pick-up location"
                  className="bg-gray-100 pl-10 pr-4 py-3 text-sm rounded-lg w-full"
                  onFocus={() => setIsSearchActive(true)}
                />
              </div>
              
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Enter your destination"
                  className="bg-gray-100 pl-10 pr-4 py-3 text-sm rounded-lg w-full"
                />
              </div>
              
              {!isSearchActive && (
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-3 rounded-lg w-full text-sm font-medium"
                >
                  Find Trip
                </button>
              )}
            </form>

            {isSearchActive && <LocationSearchPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;