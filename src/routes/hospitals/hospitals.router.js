const express = require('express');

const {
    httpgetAllHospitals
} = require('./hospitals.controller');

const hospitalsRouter = express.Router();

hospitalsRouter.get('/', httpgetAllHospitals);

module.exports = hospitalsRouter;