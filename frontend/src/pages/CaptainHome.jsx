import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import axios from 'axios';
import LiveTracking from "../components/LiveTracking";
import { LogOut } from "lucide-react";

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
      <div className="fixed p-6 -top-2 left-2 flex items-center justify-between w-screen">
        <LiveTracking />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <LogOut className="text-lg" />
        </Link>
      </div>

      <div className="h-3/5">
        <div className="h-full w-full">
          <LiveTracking />
        </div>
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        className={`fixed w-full z-10 bottom-0 bg-white px-3 py-2 pt-1 rounded-3xl transition-transform duration-300 ${
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
        className={`fixed w-full z-10 bottom-0 bg-white px-3 py-2 pt-1 rounded-3xl transition-transform duration-300 ${
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