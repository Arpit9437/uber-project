import { User } from "lucide-react"

const RidePopUp = ({ ride, setRidePopupPanel, setConfirmRidePopupPanel, confirmRide }) => {
  return (
    <div className="relative px-6">
      {/* Drag handle */}
      {/* <div className="absolute -top-2 left-0 right-0 flex justify-center">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div> */}

      {/* Header */}
      <div className="mb-6 mt-6">
        <h3 className="text-2xl font-bold text-gray-900">New Ride Request</h3>
        <p className="text-gray-500 text-sm mt-1">2.2 km away • Est. fare ₹{ride?.fare}</p>
      </div>

      {/* Ride Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        {/* Route Info */}
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

      {/* Passenger Info */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-500 mb-2">PASSENGER</p>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="text-gray-600" size={24} />
            </div>
          </div>
          <div className="ml-3">
            <p className="font-medium">
              {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
            </p>
            <p className="text-sm text-gray-500">Cash Payment</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => {
            setConfirmRidePopupPanel(true)
            confirmRide()
          }}
          className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Accept Trip
        </button>
        <button
          onClick={() => setRidePopupPanel(false)}
          className="w-full bg-gray-100 text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  )
}

export default RidePopUp

