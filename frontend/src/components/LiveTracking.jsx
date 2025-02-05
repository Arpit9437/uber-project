import { useState, useEffect } from "react"
import { LoadScript, GoogleMap, MarkerF, DirectionsRenderer } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "100%",
}

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
}

const LiveTracking = ({ pickup, destination }) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter)
  const [map, setMap] = useState(null)
  const [directions, setDirections] = useState(null)
  const [pickupCoords, setPickupCoords] = useState(null)
  const [destinationCoords, setDestinationCoords] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    )
  }, [])

  useEffect(() => {
    if (!pickup || !destination) return

    const geocoder = new window.google.maps.Geocoder()
    
    // Get pickup coordinates
    geocoder.geocode({ address: pickup }, (results, status) => {
      if (status === "OK") {
        setPickupCoords({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        })
      }
    })

    // Get destination coordinates
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === "OK") {
        setDestinationCoords({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        })
      }
    })
  }, [pickup, destination])

  useEffect(() => {
    if (!pickupCoords || !destinationCoords || !map) return

    const directionsService = new window.google.maps.DirectionsService()

    directionsService.route(
      {
        origin: pickupCoords,
        destination: destinationCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result)
          
          // Fit map bounds to show entire route
          const bounds = new window.google.maps.LatLngBounds()
          bounds.extend(pickupCoords)
          bounds.extend(destinationCoords)
          map.fitBounds(bounds)
        }
      }
    )
  }, [pickupCoords, destinationCoords, map])

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        onLoad={setMap}
        options={{ disableDefaultUI: true }}
      >
        {pickupCoords && <MarkerF position={pickupCoords}/>}
        {destinationCoords && <MarkerF position={destinationCoords}/>}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  )
}

export default LiveTracking