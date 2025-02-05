import { useState, useEffect } from "react"
import { Clock, Star, TrendingUp } from "lucide-react"

const CaptainDetails = () => {
  const [captain, setCaptain] = useState(null)

  useEffect(() => {
    const storedCaptain = localStorage.getItem("captain")
    if (storedCaptain) {
      setCaptain(JSON.parse(storedCaptain))
    }
  }, [])

  return (
    <div className="p-3 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div>
          {captain && (
            <h4 className="text-2xl font-bold capitalize">{`${captain.fullname.firstname} ${captain.fullname.lastname}`}</h4>
          )}
        </div>
        <div className="text-right">
          <h4 className="text-2xl font-semibold">₹295.20</h4>
          <p className="text-sm text-gray-600">Earned Today</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="text-blue-500" size={24} />
          </div>
          <h5 className="text-xl font-semibold">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <h5 className="text-xl font-semibold">25</h5>
          <p className="text-sm text-gray-600">Trips Completed</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="text-yellow-500" size={24} />
          </div>
          <h5 className="text-xl font-semibold">4.8</h5>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails

