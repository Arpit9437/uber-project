import { X, MapPin, Car, Bike, Car as AutoIcon } from "lucide-react";

const ConfirmRide = ({
  onClose,
  onConfirmRide,
  pickup,
  destination,
  selectedVehicle,
}) => {
  return (
    <div className="bg-white p-4 rounded-t-3xl">
      <button onClick={onClose} className="w-full text-center mb-4">
        <X
          size={24}
          className="inline-block text-gray-400 hover:text-gray-600"
        />
      </button>
      <h3 className="text-2xl font-semibold mb-5">Confirm your ride</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-3 border-b">
          <div className="h-12 w-20 bg-gray-200 rounded flex items-center justify-center">
            {selectedVehicle.id === "car" && (
              <Car className="text-gray-600" size={32} />
            )}
            {selectedVehicle.id === "moto" && (
              <Bike className="text-gray-600" size={32} />
            )}
            {selectedVehicle.id === "auto" && (
              <AutoIcon className="text-gray-600" size={32} />
            )}
          </div>
          <div>
            <h4 className="font-medium">{selectedVehicle.name}</h4>
            <p className="text-sm text-gray-600">
              {selectedVehicle.description}
            </p>
          </div>
          <div className="ml-auto">
            <span className="text-lg font-semibold">
              ₹{selectedVehicle.price}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Pickup</p>
              <p className="font-medium">{pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium">{destination}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onConfirmRide}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};
export default ConfirmRide;
