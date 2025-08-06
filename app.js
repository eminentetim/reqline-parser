const express = require('express');
const bodyParser = require('body-parser');
const reqlineController = require('./src/controllers/reqline.controller');

const app = express();
app.use(bodyParser.json());

app.post('/', reqlineController.handleReqline);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;