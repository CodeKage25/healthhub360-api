const express = require('express');
const hospitalsRouter = require('./hospitals/hospitals.router')

const api = express.Router();

api.use('/hospitals', hospitalsRouter);

module.exports = api;