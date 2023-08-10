require('dotenv').config();
const http = require('http');

const app = require('./app');

const { mongoConnect } = require('./services/mongo');
const {loadHospitals} = require('./models/hospitals.model')
const {populateHospitals} = require('./models/hospitals.model')

const PORT_SERVER = process.env.PORT_SERVER || 8000;

app.listen();
// const PORT_CLIENT = process.env.PORT_CLIENT || 3000; // Change this to your desired client port


const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await populateHospitals();
  await loadHospitals();


  server.listen(PORT_SERVER, () => {
    console.log(`Server listening on port ${PORT_SERVER}...`);
  });
}

startServer();