import { useState, useCallback, useContext } from 'react';
import { MapPin, X } from 'lucide-react';
import { debounce } from 'lodash';
import axios from 'axios';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitingForDriver from '../components/WaitingForDriver';
import LookingForDriver from '../components/LookingForDriver';
import { useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import {UserDataContext} from "../context/UserContext";

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [ride, setRide] = useState(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [fareData, setFareData] = useState(null);
  const [isFareLoading, setIsFareLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const {user} = useContext(UserDataContext);
  const {socket} = useContext(SocketContext);

  const fetchFare = async (pickupLocation, destinationLocation) => {
    if (!pickupLocation || !destinationLocation) return;

    setIsFareLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/rides/get-fare`, {
        params: {
          pickup: pickupLocation,
          destination: destinationLocation
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFareData(response.data);
    } catch (error) {
      console.error('Error fetching fare:', error);
      setFareData({ auto: 35, car: 58, moto: 24 }); 
    } finally {
      setIsFareLoading(false);
    }
  };

  useEffect(() => {
    if (activePanel === 'vehicle' && pickup && destination) {
      fetchFare(pickup, destination);
    }
  }, [activePanel, pickup, destination]);

  useEffect(() =>{
    socket.emit("join", {userType: "user", userId: user._id})
  },[user])

  socket.on('ride-confirmed', ride => {
        setActivePanel('waiting')
        setRide(ride);
    })

  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setLocationSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-suggestions`, {
        params: { input },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLocationSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setLocationSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce((input) => fetchSuggestions(input), 300),
    []
  );

  const handleLocationSelect = (location) => {
    if (activeField === 'pickup') {
      setPickup(location.description);
    } else if (activeField === 'destination') {
      setDestination(location.description);
      if (pickup) { 
        setIsSearchActive(false);
        setActivePanel('vehicle');
      }
    }
    setLocationSuggestions([]);
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

  async function createRide(vehicleType){
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }


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
              onClick={() => {
                setIsSearchActive(false);
                setLocationSuggestions([]);
                setActiveField(null);
              }}
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
                onChange={(e) => {
                  setPickup(e.target.value);
                  debouncedFetchSuggestions(e.target.value);
                }}
                onFocus={() => {
                  setIsSearchActive(true);
                  setActiveField('pickup');
                }}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Where to?"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  debouncedFetchSuggestions(e.target.value);
                }}
                onFocus={() => {
                  setIsSearchActive(true);
                  setActiveField('destination');
                }}
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
              isLoading={isLoadingSuggestions}
            />
          )}
        </div>
      </div>

      {activePanel === 'vehicle' && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <VehiclePanel
            onClose={() => setActivePanel(null)}
            onVehicleSelect={handleVehicleSelect}
            fare={fareData}
            isLoading={isFareLoading}
            selectedVehicle={setVehicleType}
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
            createRide={createRide}
          />
        </div>
      )}

      {activePanel === 'lookingForDriver' && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            selectedVehicle={selectedVehicle}
            setVehicleFound={setVehicleFound}
            setActivePanel={setActivePanel}
            onClose={() => setActivePanel('confirm')}
          />
        </div>
      )}

      {activePanel === 'waiting' && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <WaitingForDriver
            onClose={() => setActivePanel('confirm')}
            ride={ride}
          />
        </div>
      )}
    </div>
  );
};

export default Home;