const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup location"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination location"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicle type"),
  rideController.createRide
);

module.exports = router;
