const userModel = require("../model/user");

async function addUser(req, res) {
    const user = await new userModel(req.body);
    try {
        await user.save();
        res.status(201).send(`Added user.`);
    } catch (e) {
        res.status(400).send(e);
    }
}

async function loadSaveData(req, res) {
    const id = req.params.id;
    try {
        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.staus(404).send(`No user with id ${id} was found`);
        }
        res.send(user.saveData);
    } catch (e) {
        res.status(500).send(e);
    }
}

async function uploadSaveData(req, res) {
    const id = req.params.id;
    const map = req.body.map;
    try {
        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).send(`No user with id ${id} was found`);
        }
        const updatedUser = await userModel.findByIdAndUpdate(id, {
            saveData: map,
        });
        if (!updatedUser) {
            return res.status(404).send(`No user with id ${id} was found`);
        }
        res.send("Save Accomplished");
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = {
    addUser,
    loadSaveData,
    uploadSaveData,
};
