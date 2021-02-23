const express = require('express');
const app = express();
const PORT = 8000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);