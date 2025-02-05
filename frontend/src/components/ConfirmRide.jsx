import { X, MapPin, Car, Bike, ImageIcon as AutoIcon } from "lucide-react"

const ConfirmRide = ({ onClose, onConfirmRide, pickup, destination, selectedVehicle, createRide }) => {
  const handleConfirmRide = async () => {
    console.log(selectedVehicle)
    try {
      await createRide(selectedVehicle.id)
      onConfirmRide()
    } catch (error) {
      console.error("Error creating ride:", error)
    }
  }

  return (
    <div className="bg-white p-6 rounded-t-3xl shadow-lg">
      <button onClick={onClose} className="w-full flex justify-center mb-4">
        <X size={24} className="text-gray-400 hover:text-gray-600 transition-colors" />
      </button>
      <h3 className="text-2xl font-semibold mb-6">Confirm your ride</h3>

      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="h-14 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
            {selectedVehicle.id === "car" && <Car className="text-gray-600" size={36} />}
            {selectedVehicle.id === "moto" && <Bike className="text-gray-600" size={36} />}
            {selectedVehicle.id === "auto" && <AutoIcon className="text-gray-600" size={36} />}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-lg">{selectedVehicle.name}</h4>
            <p className="text-sm text-gray-600">{selectedVehicle.description}</p>
          </div>
          <div>
            <span className="text-xl font-semibold">₹{selectedVehicle.price}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin size={24} className="text-gray-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Pickup</p>
              <p className="font-medium">{pickup}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin size={24} className="text-gray-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium">{destination}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmRide}
          className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  )
}

export default ConfirmRide

