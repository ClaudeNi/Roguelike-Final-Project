const express = require("express");
const {
    getSaveData,
    addUser,
    uploadSaveData,
} = require("../controllers/UserControllers");

const apiRouter = express.Router();
//GET Methods
apiRouter.get("/users/:id", getSaveData);
//POST Methods
apiRouter.post("/users", addUser);
//PATCH Methods
apiRouter.patch("/users/:id", uploadSaveData);

module.exports = apiRouter;
