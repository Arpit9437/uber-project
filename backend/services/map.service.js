const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  const loc = response.data.results[0].geometry.location;
  return {
    ltd: loc.lat,
    lng: loc.lng,
  };
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  return response.data.rows[0].elements[0];
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  return response.data;
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  const captains = await captainModel.find({
    location:{
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius/6371]
      }
    }
  });
  return captains;
}
6371