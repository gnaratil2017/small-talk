const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://user_0:L3CFaKdfbDwzwEbC@cluster0.twlp2.mongodb.net/small-talk?retryWrites=true&w=majority')
  .then(result => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch(err => console.log(err))
