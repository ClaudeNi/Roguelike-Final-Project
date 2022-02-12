const express = require("express");
const {
    loadSaveData,
    addUser,
    uploadSaveData,
    getUser,
} = require("../controllers/UserControllers");

const apiRouter = express.Router();
//GET Methods
apiRouter.get("/users/load/:email", loadSaveData);
//POST Methods
apiRouter.post("/users", addUser);
apiRouter.post("/users/:email", getUser);
//PATCH Methods
apiRouter.patch("/users/save/:email", uploadSaveData);

module.exports = apiRouter;
