const cors = require('cors');

const corsOptions = {
    origin: "https://gymclient-bm7t.onrender.com",
    credentials: true,
};

module.exports = cors(corsOptions);