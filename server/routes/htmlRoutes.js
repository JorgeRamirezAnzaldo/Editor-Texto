//Import path
const path = require('path');

//Export get method for app
module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html')) //Send index.html as response
  );
