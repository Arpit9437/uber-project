import { X, Car, Clock, User, Bike } from "lucide-react"

const VehiclePanel = ({ onClose, onVehicleSelect, fare = {}, isLoading = false, selectedVehicle }) => {
  const vehicles = [
    {
      id: "car",
      name: "UberGo",
      capacity: 4,
      eta: "2 mins away",
      description: "Affordable, compact rides",
      price: fare?.car || 58,
      icon: Car,
    },
    {
      id: "moto",
      name: "Moto",
      capacity: 1,
      eta: "3 mins away",
      description: "Affordable motorcycle rides",
      price: fare?.moto || 24,
      icon: Bike,
    },
    {
      id: "auto",
      name: "UberAuto",
      capacity: 3,
      eta: "3 mins away",
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

  return (
    <div className="bg-white p-6 rounded-t-3xl shadow-lg">
      <button onClick={onClose} className="w-full flex justify-center mb-4">
        <X size={24} className="text-gray-400 hover:text-gray-600 transition-colors" />
      </button>
      <h3 className="text-2xl font-semibold mb-6">Choose a Vehicle</h3>
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          <Clock className="animate-spin inline-block mr-2" size={24} />
          Loading fares...
        </div>
      ) : (
        <div className="space-y-4">
          {vehicles.map((vehicle) => {
            const VehicleIcon = vehicle.icon
            return (
              <button
                key={vehicle.id}
                onClick={() => handleVehicleSelection(vehicle)}
                className="flex items-center w-full p-4 border-2 rounded-xl hover:border-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
              >
                <div className="h-12 w-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <VehicleIcon size={28} className="text-gray-600" />
                </div>
                <div className="ml-4 flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-lg">{vehicle.name}</h4>
                    <span className="text-sm text-gray-600 flex items-center">
                      <User size={14} className="inline mr-1" />
                      {vehicle.capacity}
                    </span>
                  </div>
                  <h5 className="text-sm font-medium flex items-center gap-1 text-gray-500">
                    <Clock size={14} />
                    {vehicle.eta}
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">{vehicle.description}</p>
                </div>
                <div className="text-xl font-semibold">₹{vehicle.price}</div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default VehiclePanel

