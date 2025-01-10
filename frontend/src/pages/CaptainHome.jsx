import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const confirmRide = () => {
    // Mock data for demo
    const rideData = {
      user: {
        fullname: { firstname: 'John', lastname: 'Doe' }
      },
      pickup: 'Sample Pickup Location',
      destination: 'Sample Destination',
      fare: 199
    };
    setRide(rideData);
  };

  return (
    <div className="h-screen">
      {/* Header */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img 
          className="w-16" 
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
          alt="Uber Logo" 
        />
        <Link to="/captain-home" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map */}
      <div className="h-3/5">
        <img 
          className="h-full w-full object-cover" 
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" 
          alt="Map" 
        />
      </div>

      {/* Captain Details */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* Ride Popup */}
      <div className={`fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 transition-transform duration-300 ${ridePopupPanel ? 'translate-y-0' : 'translate-y-full'}`}>
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Popup */}
      <div className={`fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 transition-transform duration-300 ${confirmRidePopupPanel ? 'translate-y-0' : 'translate-y-full'}`}>
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;