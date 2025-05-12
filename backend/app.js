const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/studentDB');

app.listen(5000, () => {
    console.log('Server is running on port 5000')
});