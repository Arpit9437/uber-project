const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({ error: 'Captain already exists.' });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const {email, password} = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ error: 'Invalid Email or Password.' });
    }
    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid Email or Password.' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain });
}

module.exports.logoutCaptain = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization;
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Captain logged out.' });
}

module.exports.getCaptainProfile = async (req, res) => {
    return res.status(200).json({ captain: req.captain });
}