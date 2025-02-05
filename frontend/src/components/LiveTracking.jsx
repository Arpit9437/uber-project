import { useState, useEffect } from "react"
import { LoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "100%",
}

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
}

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter)
  const [map, setMap] = useState(null)

  useEffect(() => {
    let watchId

    const handlePositionUpdate = (position) => {
      const { latitude, longitude } = position.coords
      setCurrentPosition({
        lat: latitude,
        lng: longitude,
      })
    }

    const handleError = (error) => {
      console.error("Error getting location:", error)
    }

    navigator.geolocation.getCurrentPosition(handlePositionUpdate, handleError, { enableHighAccuracy: true })

    watchId = navigator.geolocation.watchPosition(handlePositionUpdate, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [])

  useEffect(() => {
    if (map && currentPosition) {
      map.panTo(currentPosition)
    }
  }, [map, currentPosition])

  const onLoad = (map) => {
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MarkerF position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  )
}

export default LiveTracking

