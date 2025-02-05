import { useState, useCallback, useContext, useEffect } from "react"
import { MapPin, X } from "lucide-react"
import { debounce } from "lodash"
import axios from "axios"
import LocationSearchPanel from "../components/LocationSearchPanel"
import VehiclePanel from "../components/VehiclePanel"
import ConfirmRide from "../components/ConfirmRide"
import WaitingForDriver from "../components/WaitingForDriver"
import LookingForDriver from "../components/LookingForDriver"
import { SocketContext } from "../context/SocketContext"
import { UserDataContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import LiveTracking from "../components/LiveTracking"

const Home = () => {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [activeField, setActiveField] = useState(null)
  const [activePanel, setActivePanel] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [ride, setRide] = useState(null)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [fareData, setFareData] = useState(null)
  const [isFareLoading, setIsFareLoading] = useState(false)
  const [vehicleType, setVehicleType] = useState(null)
  const { user } = useContext(UserDataContext)
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  const fetchFare = async (pickupLocation, destinationLocation) => {
    if (!pickupLocation || !destinationLocation) return

    setIsFareLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/rides/get-fare`, {
        params: {
          pickup: pickupLocation,
          destination: destinationLocation,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setFareData(response.data)
    } catch (error) {
      console.error("Error fetching fare:", error)
      setFareData({ auto: 35, car: 58, moto: 24 })
    } finally {
      setIsFareLoading(false)
    }
  }

  useEffect(() => {
    if (activePanel === "vehicle" && pickup && destination) {
      fetchFare(pickup, destination)
    }
  }, [activePanel, pickup, destination])

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on("ride-confirmed", (ride) => {
    setActivePanel("waiting")
    setRide(ride)
  })
  socket.on("ride-started", (ride) => {
    console.log("ride")
    navigate("/riding", { state: { ride } })
  })

  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setLocationSuggestions([])
      return
    }

    setIsLoadingSuggestions(true)
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-suggestions`, {
        params: { input },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLocationSuggestions(response.data)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setLocationSuggestions([])
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  const debouncedFetchSuggestions = useCallback(
    debounce((input) => fetchSuggestions(input), 300),
    [],
  )

  const handleLocationSelect = (location) => {
    if (activeField === "pickup") {
      setPickup(location.description)
    } else if (activeField === "destination") {
      setDestination(location.description)
      if (pickup) {
        setIsSearchActive(false)
        setActivePanel("vehicle")
      }
    }
    setLocationSuggestions([])
  }

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle)
    setActivePanel("confirm")
  }

  const handleConfirmRide = () => {
    setActivePanel("lookingForDriver")
  }

  async function createRide(vehicleType) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
  }

  return (
    <div className="h-screen relative overflow-hidden bg-gray-100">
      {/* <div className="absolute left-5 top-5 z-10">
        <img
          className="w-20 h-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
        />
      </div> */}

      <div className="h-screen w-screen">
        <LiveTracking />
      </div>

      <div
        className={`fixed inset-x-0 transition-all duration-300 ease-in-out ${
          isSearchActive ? "top-0 h-full bg-white" : "bottom-0"
        }`}
      >
        <div className="bg-white rounded-t-3xl p-6 shadow-lg">
          {isSearchActive && (
            <button
              onClick={() => {
                setIsSearchActive(false)
                setLocationSuggestions([])
                setActiveField(null)
              }}
              className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          )}

          <h4 className="text-2xl font-semibold mb-6">Where to?</h4>

          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Pickup location"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value)
                  debouncedFetchSuggestions(e.target.value)
                }}
                onFocus={() => {
                  setIsSearchActive(true)
                  setActiveField("pickup")
                }}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Where to?"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value)
                  debouncedFetchSuggestions(e.target.value)
                }}
                onFocus={() => {
                  setIsSearchActive(true)
                  setActiveField("destination")
                }}
              />
            </div>

            {!isSearchActive && pickup && destination && (
              <button
                onClick={() => setActivePanel("vehicle")}
                className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
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

      {activePanel === "vehicle" && (
        <div className="fixed inset-x-0 bottom-0 z-20">
          <VehiclePanel
            onClose={() => setActivePanel(null)}
            onVehicleSelect={handleVehicleSelect}
            fare={fareData}
            isLoading={isFareLoading}
            selectedVehicle={setVehicleType}
          />
        </div>
      )}

      {activePanel === "confirm" && (
        <div className="fixed inset-x-0 bottom-0 z-20">
          <ConfirmRide
            onClose={() => setActivePanel("vehicle")}
            onConfirmRide={handleConfirmRide}
            pickup={pickup}
            destination={destination}
            selectedVehicle={selectedVehicle}
            createRide={createRide}
          />
        </div>
      )}

      {activePanel === "lookingForDriver" && (
        <div className="fixed inset-x-0 bottom-0 z-20">
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            selectedVehicle={selectedVehicle}
            setVehicleFound={setVehicleFound}
            setActivePanel={setActivePanel}
            onClose={() => setActivePanel("confirm")}
          />
        </div>
      )}

      {activePanel === "waiting" && (
        <div className="fixed inset-x-0 bottom-0 z-20">
          <WaitingForDriver onClose={() => setActivePanel("confirm")} ride={ride} />
        </div>
      )}
    </div>
  )
}

export default Home

