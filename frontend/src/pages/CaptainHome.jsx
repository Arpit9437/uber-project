import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const [captain, setCaptain] = useState(null);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const storedCaptain = localStorage.getItem("captain");
    if (storedCaptain) {
      try {
        const parsedCaptain = JSON.parse(storedCaptain);
        setCaptain(parsedCaptain);
      } catch (error) {
        console.error("Error parsing captain data:", error);
        localStorage.removeItem("captain");
      }
    }
  }, []);

  useEffect(() => {
    socket?.on("new-ride", (data) => {
      console.log(data);
      setRide(data);
      setRidePopupPanel(true);
    });
  }, [socket]);

  useEffect(() => {
    if (!captain?._id || !socket) return;

    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000);
  }, [captain, socket]);

  const confirmRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  };

  if (!captain) return null;

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        className={`fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 transition-transform duration-300 ${
          ridePopupPanel ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        className={`fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 transition-transform duration-300 ${
          confirmRidePopupPanel ? "translate-y-0" : "translate-y-full"
        }`}
      >
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
