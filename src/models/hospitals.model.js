const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const axios = require('axios');

const hospitalDatabase = require('./hospitals.mongo');


// async function fetchCsvData() {
//   return new Promise((resolve, reject) => {
//     const csvData = [];
//     fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'hospital_data.csv'))
//       .pipe(parse({ columns: true }))
//       .on('data', (data) => {
//         csvData.push(data); // Push each parsed row to the csvData array
//       })
//       .on('error', (err) => {
//         console.error('Error parsing CSV:', err);
//         reject(err);
//       })
//       .on('end', () => {
//         resolve(csvData); // Resolve with the array of parsed data
//       });
//   });
// }
async function fetchJsonData() {
  try {
    const url = 'https://api.reliancehmo.com/v3/providers';
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from api...');
    throw error
  }
}

async function populateHospitals() {
    try {
      console.log('Fetching CSV data...');
      const jsonData = await fetchJsonData();
      console.log('CSV data fetched successfully.');

      if (!Array.isArray(jsonData.data)) {
        console.error('Error: The fetched data is not in the expected format.');
        return;
      }
  
      const hospitals = jsonData.data.map((item) => {
        return {
          state: item.State,
          name: item.Name,
         location: item.Location,
         image: item.Image,
        };
      });
  
      console.log('Inserting hospital data into MongoDB...');
      await hospitalDatabase.insertMany(hospitals);
      console.log('Hospital data inserted into MongoDB successfully.');
    } catch (error) {
      console.error('Error populating hospital data:', error);
    }
  }

async function loadHospitals() {
    try {
      console.log('Loading hospital data from MongoDB...');
      const hospitals = await hospitalDatabase.find({}, {
        '_id': 0, '__v': 0,
    });
      console.log('Hospital data loaded successfully.');
  
      return hospitals;
    } catch (error) {
      console.error('Error loading hospital data:', error);
      throw error;
    }
}


async function getAllHospitals(skip, limit, sortBy) {
    try {
        console.log('Loading all hospital...');
        let query = hospitalDatabase.find({}, { '_id': 0, '__v': 0 });

        // If sortBy parameter is provided, apply sorting
        if (sortBy) {
            query = query.sort({ [sortBy]: 1 }); // 1 for ascending order, -1 for descending
        }

        const hospital = await query.skip(skip).limit(limit);
        console.log('hospital loaded successfully.');
        return hospital;
    } catch (error) {
        console.error('Error loading hospital:', error);
        throw error;
    }
}


module.exports = {
    populateHospitals,
    loadHospitals,
    getAllHospitals

}