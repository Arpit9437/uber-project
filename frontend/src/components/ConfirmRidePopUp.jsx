import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Clock } from "lucide-react"

const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()
  const [durations, setDurations] = useState({})

  const submitHandler = async (e) => {
    e.preventDefault()

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/rides/start-ride`,
      {
        params: {
          rideId: ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    if (response.status === 200) {
      setConfirmRidePopupPanel(false)
      setRidePopupPanel(false)
      navigate("/captain-riding", { state: { ride: ride } })
    }
  }

  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-distance-time`, {
          params: { origin: ride?.pickup, destination: ride?.destination },
          headers: { Authorization: `Bearer ${token}` },
        })
        setDurations(response.data)
      } catch (error) {
        console.error("Error fetching durations:", error)
      }
    }

    if (ride?.pickup && ride?.destination) {
      fetchDurations()
    }
  }, [ride?.pickup, ride?.destination])

  return (
    <div className="relative px-4">
      <div className="mb-6 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Confirm Trip Details</h3>
          {durations?.duration && (
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-1" />
              <span className="text-sm font-medium">{durations.duration.text}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-500 mb-2">PASSENGER</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg text-gray-600">
                  {ride?.user?.fullname?.firstname?.[0] || "U"}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="font-medium capitalize">
                {ride?.user?.fullname?.firstname || "User"}
              </p>
              <p className="text-sm text-gray-500">{durations?.distance?.text || "Calculating..."}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">₹{ride?.fare}</p>
            <p className="text-sm text-gray-500">Cash</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative pl-8">
          <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gray-200" />

          <div className="mb-6 relative">
            <div className="absolute left-[calc(-1.25rem)] w-6 h-6 flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full" />
            </div>
            <p className="text-sm text-gray-500">PICKUP</p>
            <h4 className="font-medium mt-0.5">{ride?.pickup || "562/11-A"}</h4>
          </div>

          <div className="relative">
            <div className="absolute left-[calc(-1.25rem)] w-6 h-6 flex items-center justify-center">
              <div className="w-3 h-3 bg-[#06C167] rounded-full" />
            </div>
            <p className="text-sm text-gray-500">DROPOFF</p>
            <h4 className="font-medium mt-0.5">
              {ride?.destination || "562/11-A"}
            </h4>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Verification Code
          </label>
          <input
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter 6-digit code"
            maxLength="6"
          />
        </div>

        <div className="pt-2 space-y-3">
          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Start Trip
          </button>
          <button
            type="button"
            onClick={() => {
              setConfirmRidePopupPanel(false)
              setRidePopupPanel(false)
            }}
            className="w-full bg-gray-100 text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConfirmRidePopUp