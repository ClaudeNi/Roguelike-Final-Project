const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
    `mongodb+srv://${process.env.CONNECT_NAME}:${process.env.CONNECT_PASS}@freecluster.nk9f1.mongodb.net/RoguelikeGameUsers?retryWrites=true&w=majority`
);
