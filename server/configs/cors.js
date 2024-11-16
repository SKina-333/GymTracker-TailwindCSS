const cors = require('cors');

const corsOptions = {
    origin: [
        'http://localhost:3000', // For local development
        'https://client-2zw8.onrender.com', // Your frontend Render URL
      ],
    credentials: true,
};

module.exports = cors(corsOptions);