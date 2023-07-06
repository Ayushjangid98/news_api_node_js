require('dotenv').config();
require("./db_helper/db_connection")
const express = require('express');
const port = process.env.local_port;
const routes = require("./routes/routes");
const bodyParser = require("body-parser");



const app = express();
app.use(express.static('category_images'))
app.use(express.json());      
app.use(express.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 




app.use("/",routes)
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});