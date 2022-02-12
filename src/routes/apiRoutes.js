const express = require("express");
const {
    loadSaveData,
    addUser,
    uploadSaveData,
} = require("../controllers/UserControllers");

const apiRouter = express.Router();
//GET Methods
apiRouter.get("/users/:id", loadSaveData);
//POST Methods
apiRouter.post("/users", addUser);
//PATCH Methods
apiRouter.patch("/users/:id", uploadSaveData);

module.exports = apiRouter;
