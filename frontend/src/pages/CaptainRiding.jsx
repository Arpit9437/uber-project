import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import FinishRide from "../components/FinishRide"
import LiveTracking from "../components/LiveTracking"

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const [rideCompleted, setRideCompleted] = useState(false)
  const location = useLocation()
  const rideData = location.state?.ride || {
    user: { fullname: { firstname: "Passenger" } },
    pickup: "562/11-A",
    destination: "562/11-A",
    fare: "150",
  }

  const handleCompleteRide = () => {
    setFinishRidePanel(true)
  }

  const handleFinishRide = () => {
    setRideCompleted(true)
    setFinishRidePanel(false)
  }

  return (
    <div className="relative h-screen bg-gray-100">
      <div className="absolute inset-0">
        <LiveTracking />
      </div>

      {!rideCompleted && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Current Ride</h2>
              <p className="text-sm text-gray-600">4 KM away</p>
            </div>
            <button
              className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md"
              onClick={handleCompleteRide}
            >
              Complete Ride
            </button>
          </div>
        </div>
      )}

      {finishRidePanel && (
        <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-lg transition-transform duration-300 ease-in-out transform translate-y-0">
          <FinishRide onClose={() => setFinishRidePanel(false)} ride={rideData} onFinish={handleFinishRide} />
        </div>
      )}

      {rideCompleted && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-5/6 max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Ride Completed!</h2>
            <p className="text-gray-600 mb-4 text-center">Thank you for using our service.</p>
            <button
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold"
              onClick={() => setRideCompleted(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CaptainRiding

