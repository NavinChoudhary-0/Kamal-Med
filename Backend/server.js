const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Routes
const productsRouter = require('./routes/products');
// const usersRouter = require('./routes/users');

app.use('/api/products', productsRouter);
// app.use('/api/users', usersRouter);

// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    sequelize
    .sync()
    .then(() => {
      console.log('✅ Tables created successfully!');
    })
    .catch((error) => {
      console.error('❌ Unable to create tables:', error);
    });
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();