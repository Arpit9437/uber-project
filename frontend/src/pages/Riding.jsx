import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Home, MapPin, Wallet, Car } from "lucide-react"
import { SocketContext } from "../context/SocketContext"
import LiveTracking from "../components/LiveTracking"

const Riding = () => {
  const location = useLocation()
  const { ride } = location.state || {}
  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)

  socket.on("ride-ended", () => {
    navigate("/home")
  })

  const handlePayment = () => {
    console.log("Processing payment...")
  }

  return (
    <div className="h-screen relative overflow-hidden bg-gray-100">
      {/* Map Section */}
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>

      {/* Home Button */}
      <Link
        to="/home"
        className="fixed right-0.5 top-0.5 h-14 w-14 bg-white shadow-lg flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors z-10"
      >
        <Home className="w-6 h-6 text-gray-700" />
      </Link>

      {/* Ride Details Section */}
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-lg">
        <div className="p-6">
          <div className="space-y-6">
            {/* Vehicle & Driver Info */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <Car className="text-gray-600" size={36} />
              </div>
              <div>
                <h4 className="font-semibold text-lg capitalize">{ride?.captain?.fullname?.firstname || "John"}</h4>
                <p className="text-gray-600">{ride?.captain?.vehicle?.plate || "XX XX XXXX"}</p>
              </div>
              <div className="ml-auto">
                <span className="text-2xl font-bold">₹{ride?.fare || "0"}</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Location Details */}
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500">Pickup</p>
                  <p className="font-medium text-lg">{ride?.pickup || "Pickup Address"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500">Destination</p>
                  <p className="font-medium text-lg">{ride?.destination || "Destination Address"}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-start gap-4">
                <Wallet size={24} className="text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500">Payment Method</p>
                  <p className="font-medium text-lg">Cash Payment</p>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              className="w-full bg-black text-white py-4 rounded-lg font-medium text-lg hover:bg-gray-900 transition-colors"
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Riding

