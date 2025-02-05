import axios from "axios"
import { useNavigate } from "react-router-dom"
import { User, CreditCard } from "lucide-react"

const FinishRide = ({ onClose, ride }) => {
  const navigate = useNavigate()

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/rides/end-ride`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )

    if (response.status === 200) {
      navigate("/captain-home")
    }
  }

  return (
    <div className="relative px-6">
      {/* Drag handle */}
      <div className="absolute -top-2 left-0 right-0 flex justify-center">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" onClick={onClose} />
      </div>

      {/* Header */}
      <div className="mb-6 mt-6">
        <h3 className="text-2xl font-bold text-gray-900">Complete Trip</h3>
      </div>

      {/* Passenger Info */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-500 mb-2">PASSENGER</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="text-gray-600" size={24} />
              </div>
            </div>
            <div className="ml-3">
              <p className="font-medium capitalize">{ride?.user?.fullname?.firstname || "Passenger"}</p>
              <p className="text-sm text-gray-500">2.2 KM total distance</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-xl">₹{ride?.fare || "150"}</p>
            <p className="text-sm text-gray-500">Cash</p>
          </div>
        </div>
      </div>

      {/* Route Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative pl-8">

          {/* Pickup */}
          <div className="mb-6 relative">
            <div className="absolute left-[calc(-1.25rem)] w-6 h-6 flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full" />
            </div>
            <p className="text-sm text-gray-500">PICKUP</p>
            <h4 className="font-medium mt-0.5">{ride?.pickup || "562/11-A"}</h4>
          </div>

          {/* Destination */}
          <div className="relative">
            <div className="absolute left-[calc(-1.25rem)] w-6 h-6 flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <p className="text-sm text-gray-500">DROPOFF</p>
            <h4 className="font-medium mt-0.5">{ride?.destination || "562/11-A"}</h4>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-500 mb-2">PAYMENT</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <CreditCard className="text-white" size={20} />
            </div>
            <div>
              <p className="font-medium">Cash Payment</p>
              <p className="text-sm text-gray-500">Collect ₹{ride?.fare || "150"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mb-6">
        <button
          onClick={endRide}
          className="w-full bg-black text-white font-medium py-4 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Complete Trip
        </button>
      </div>
    </div>
  )
}

export default FinishRide

