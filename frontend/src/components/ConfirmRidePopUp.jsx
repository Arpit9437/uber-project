import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setConfirmRidePopupPanel(false);
    setRidePopupPanel(false);
    navigate('/captain-riding', { state: { ride } });
  };

  return (
    <div>
      <button 
        className="p-1 text-center w-[93%] absolute top-0" 
        onClick={() => setRidePopupPanel(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </button>
      
      <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>
      
      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img 
            className="h-12 rounded-full object-cover w-12" 
            src="/api/placeholder/48/48" 
            alt="User" 
          />
          <h2 className="text-lg font-medium capitalize">{ride?.user?.fullname?.firstname || 'User'}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Payment</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />
            <button className="w-full mt-5 text-lg bg-green-600 text-white font-semibold p-3 rounded-lg">
              Confirm
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirmRidePopupPanel(false);
                setRidePopupPanel(false);
              }}
              className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;