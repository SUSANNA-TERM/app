const express = require("express");

// instantiate an Express application
const app = express();

// apply json middleware globally
app.use(express.json())

// serve static files
app.use(express.static('public'));

const domain = 'localhost'
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://${domain}:${port}`);
});