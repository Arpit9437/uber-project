import { ChevronDown, MapPin, Banknote, AlertCircle, Car } from "lucide-react"

const WaitingForDriver = ({ onClose, ride }) => {
  return (
    <div className="bg-white p-6 rounded-t-3xl shadow-lg">
      <button onClick={onClose} className="w-full flex justify-center mb-4">
        <ChevronDown size={24} className="text-gray-400 hover:text-gray-600 transition-colors" />
      </button>

      <div className="flex items-center justify-between mb-8">
        <div className="h-16 w-24 bg-gray-100 rounded-lg flex items-center justify-center">
          <Car size={36} className="text-gray-600" />
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold capitalize">{ride?.captain?.fullname?.firstname || "Driver"}</h2>
          <h4 className="text-2xl font-bold -mt-1 mb-1">{ride?.captain?.vehicle?.plate || "XX XX XX XXXX"}</h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <div className="flex items-center justify-end gap-1 mt-2">
            <AlertCircle size={18} className="text-gray-500" />
            <h1 className="text-lg font-semibold">{ride?.otp || "0000"}</h1>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
          <MapPin size={24} className="text-gray-500 mt-1" />
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-gray-600">{ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
          <MapPin size={24} className="text-gray-500 mt-1" />
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-gray-600">{ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Banknote size={24} className="text-gray-500 mt-1" />
          <div>
            <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
            <p className="text-gray-600">Cash Payment</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver

