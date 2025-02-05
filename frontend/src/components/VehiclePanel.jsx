import { X, Car, Clock, User, Bike } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"

const VehiclePanel = ({
  onClose,
  onVehicleSelect,
  fare = {},
  isLoading = false,
  selectedVehicle,
  pickup,
  destination,
}) => {
  const [durations, setDurations] = useState({})
  const vehicles = [
    {
      id: "car",
      name: "UberGo",
      capacity: 4,
      description: "Affordable, compact rides",
      price: fare?.car || 58,
      icon: Car,
    },
    {
      id: "moto",
      name: "Moto",
      capacity: 1,
      description: "Affordable motorcycle rides",
      price: fare?.moto || 24,
      icon: Bike,
    },
    {
      id: "auto",
      name: "UberAuto",
      capacity: 3,
      description: "Affordable Auto rides",
      price: fare?.auto || 35,
      icon: Car,
    },
  ]

  const handleVehicleSelection = async (vehicle) => {
    try {
      selectedVehicle(vehicle)
      onVehicleSelect(vehicle)
    } catch (error) {
      console.error("Error creating ride:", error)
    }
  }

  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-distance-time`, {
          params: { origin: pickup, destination: destination },
          headers: { Authorization: `Bearer ${token}` },
        })
        setDurations(response.data)
      } catch (error) {
        console.error("Error fetching durations:", error)
      }
    }

    if (pickup && destination) {
      fetchDurations()
    }
  }, [pickup, destination])

  return (
    <div className="bg-white p-4 rounded-t-3xl">
      <button onClick={onClose} className="w-full text-center mb-4">
        <X size={24} className="inline-block text-gray-400 hover:text-gray-600" />
      </button>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-semibold">Choose a Vehicle</h3>
        {durations.duration && (
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-1" />
            <span className="text-sm font-medium">{durations.duration.text}</span>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="text-center py-4 text-gray-500">Loading fares...</div>
      ) : (
        <div className="space-y-2">
          {vehicles.map((vehicle) => {
            const VehicleIcon = vehicle.icon
            return (
              <button
                key={vehicle.id}
                onClick={() => handleVehicleSelection(vehicle)}
                className="flex items-center w-full p-4 border-2 rounded-xl hover:border-black transition-colors"
              >
                <div className="h-10 w-16 bg-gray-200 rounded flex items-center justify-center">
                  <VehicleIcon size={24} className="text-gray-600" />
                </div>
                <div className="ml-4 flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{vehicle.name}</h4>
                    <span className="text-sm text-gray-600">
                      <User size={14} className="inline mr-1" />
                      {vehicle.capacity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{vehicle.description}</p>
                </div>
                <div className="text-lg font-semibold">₹{vehicle.price}</div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default VehiclePanel