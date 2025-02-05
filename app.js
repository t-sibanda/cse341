const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('VaSibanda nemhuri yavo');
});

const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

const mongoose = require('mongoose');
mongoose.connect('your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts',
    },
    servers: [
      { url: 'http://localhost:3000' },
      { url: 'https://your-render-app-url.onrender.com' },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));