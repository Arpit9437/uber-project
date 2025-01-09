import { X, Car, Clock, User, Bike, Car as AutoIcon } from "lucide-react";

const VehiclePanel = ({ onClose, onVehicleSelect, fare = {} }) => {
  const vehicles = [
    {
      id: "car",
      name: "UberGo",
      capacity: 4,
      eta: "2 mins away",
      description: "Affordable, compact rides",
      price: fare.car || 199,
      icon: Car,
    },
    {
      id: "moto",
      name: "Moto",
      capacity: 1,
      eta: "3 mins away",
      description: "Affordable motorcycle rides",
      price: fare.moto || 49,
      icon: Bike,
    },
    {
      id: "auto",
      name: "UberAuto",
      capacity: 3,
      eta: "3 mins away",
      description: "Affordable Auto rides",
      price: fare.auto || 99,
      icon: AutoIcon,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-t-3xl">
      <button onClick={onClose} className="w-full text-center mb-4">
        <X
          size={24}
          className="inline-block text-gray-400 hover:text-gray-600"
        />
      </button>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div className="space-y-2">
        {vehicles.map((vehicle) => {
          const VehicleIcon = vehicle.icon;
          return (
            <button
              key={vehicle.id}
              onClick={() => onVehicleSelect(vehicle)}
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
                <h5 className="text-sm font-medium flex items-center gap-1">
                  <Clock size={14} className="text-gray-500" />
                  {vehicle.eta}
                </h5>
                <p className="text-xs text-gray-600">{vehicle.description}</p>
              </div>
              <div className="text-lg font-semibold">₹{vehicle.price}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VehiclePanel;
