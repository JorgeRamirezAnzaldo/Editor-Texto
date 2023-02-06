//Import express
const express = require('express');

//Initialize app
const app = express();
//Define port
const PORT = process.env.PORT || 3000;

//Configure app
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use htmlRoutes
require('./routes/htmlRoutes')(app);

//Make the app listen in the defined port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
