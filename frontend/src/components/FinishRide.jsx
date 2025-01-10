import React from 'react'

const FinishRide = ({ onClose, ride }) => {
    const handleFinishRide = () => {
        // Simulating ride completion without backend
        console.log('Ride finished')
        onClose()
    }

    return (
        <div className="bg-white rounded-t-3xl p-6 shadow-lg max-w-md mx-auto">
            <div className="flex justify-center mb-4">
                <div className="w-12 h-1 bg-gray-300 rounded-full" onClick={onClose}></div>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Finish this Ride</h3>
            <div className="flex items-center justify-between p-4 border-2 border-uber-blue rounded-lg mb-6">
                <div className="flex items-center gap-3">
                    <img 
                        className="h-12 w-12 rounded-full object-cover" 
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" 
                        alt="Passenger" 
                    />
                    <h2 className="text-lg font-medium text-gray-800">{ride?.user?.fullname?.firstname || 'Passenger'}</h2>
                </div>
                <h5 className="text-lg font-semibold text-uber-blue">2.2 KM</h5>
            </div>
            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 p-3 border-b border-gray-200">
                    <div className="text-uber-blue text-2xl">
                        <i className="ri-map-pin-user-fill"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">Pickup Location</h3>
                        <p className="text-sm text-gray-600">{ride?.pickup || '562/11-A'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-3 border-b border-gray-200">
                    <div className="text-uber-blue text-2xl">
                        <i className="ri-map-pin-2-fill"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">Destination</h3>
                        <p className="text-sm text-gray-600">{ride?.destination || '562/11-A'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-3">
                    <div className="text-uber-blue text-2xl">
                        <i className="ri-currency-line"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">₹{ride?.fare || '150'}</h3>
                        <p className="text-sm text-gray-600">Cash Payment</p>
                    </div>
                </div>
            </div>
            <button
                onClick={handleFinishRide}
                className="w-full py-4 bg-uber-blue text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Finish Ride
            </button>
        </div>
    )
}

export default FinishRide

