const {
    getAllHospitals
} = require('../../models/hospitals.model');

const {
    getPagination
} = require('../../services/query');

async function httpgetAllHospitals(req, res) {
    try {
        console.log('Fetching all hospitals...')
        const { skip, limit } = getPagination(req.query)
        const hospitals = await getAllHospitals(skip, limit);
        console.log('Hospital data loaded successfully.');
        res.status(200).json(hospitals)
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({
            error: 'Failed to fetch hospitals'
        })
    }
}

module.exports = {
    httpgetAllHospitals
}