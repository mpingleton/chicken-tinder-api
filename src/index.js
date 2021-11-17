if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { models, initDatabase } = require('./database');
//const apiRoutes = require('./routes');

const app = express();
const port = 3001;

const main = async () => {
  // Initialize the database.
  await initDatabase();

  // Use the routes.
  app.use(bodyParser.json());
  app.use(cors());
  //app.use('/api', apiRoutes);

  // Start listening for HTTP calls.
  app.listen(port, () => {
    console.log(`The Chicken Tinder API is now listening for requests on port ${port}.`)
  });
};

main();
