const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    state: {
        type: String,
        
    },
    name: {
        type: String,
        
    },
    location: {
        type: String,
        
    },
    image: {
        type: String,
    }
})

module.exports = mongoose.model('Hospitals', hospitalSchema)