if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { initDatabase, syncModels, closeDatabase } = require('./index.js');

const main = async () => {
  // Connect to the database.
  await initDatabase();

  // Sync the models.
  await syncModels();

  // Close the database connection so the application can close.
  await closeDatabase();
};

main();
