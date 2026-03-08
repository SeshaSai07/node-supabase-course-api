const express = require('express');
const cors = require('cors');
require("dotenv").config();

const logger = require('./middleware/logger.js');
const courseRoutes = require('./routes/courses.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/", courseRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});