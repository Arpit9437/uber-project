import { ChevronDown, MapPin, Banknote, AlertCircle, Car } from "lucide-react";

const WaitingForDriver = ({ onClose, ride }) => {
  return (
    <div className="bg-white p-4 rounded-t-3xl">
      <button onClick={onClose} className="w-full text-center mb-4">
        <ChevronDown
          size={24}
          className="inline-block text-gray-400 hover:text-gray-600"
        />
      </button>

      <div className="flex items-center justify-between mb-6">
        <div className="h-12 w-20 bg-gray-200 rounded flex items-center justify-center">
          <Car size={32} className="text-gray-600" />
        </div>
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {ride?.captain?.fullname?.firstname || "Driver"}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {ride?.captain?.vehicle?.plate || "XX XX XX XXXX"}
          </h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <div className="flex items-center justify-end gap-1">
            <AlertCircle size={16} className="text-gray-500" />
            <h1 className="text-lg font-semibold">{ride?.otp || "0000"}</h1>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <MapPin size={20} className="text-gray-500" />
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-sm text-gray-600">{ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3 border-b-2">
          <MapPin size={20} className="text-gray-500" />
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm text-gray-600">{ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <Banknote size={20} className="text-gray-500" />
          <div>
            <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
            <p className="text-sm text-gray-600">Cash Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WaitingForDriver;
