const userModel = require("../model/user");
const validator = require("validator");

async function addUser(req, res) {
    const user = await new userModel(req.body);
    if (!validator.isEmail(user.email)) {
        return res.status(400).send(`${user.email} is not a valid email`);
    }
    if (user.password !== req.body.rePassword) {
        return res.status(400).send(`Passwords are not the same.`);
    }
    try {
        await user.save();
        res.status(201).send(true);
    } catch (e) {
        res.status(400).send(e);
    }
}

async function getUser(req, res) {
    const email = req.params.email;
    const password = req.body.password;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .send(`No user with email ${email} was found`);
        }

        if (user.password !== password) {
            return res.status(400).send(`Incorrect password`);
        }
        res.send(true);
    } catch (e) {
        res.status(500).send(e);
    }
}

async function loadSaveData(req, res) {
    const email = req.params.email;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.staus(404).send(`No user with email ${email} was found`);
        }
        res.send(user.saveData);
    } catch (e) {
        res.status(500).send(e);
    }
}

async function uploadSaveData(req, res) {
    const email = req.params.email;
    const map = req.body.map;
    const player = req.body.player;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .send(`No user with email ${email} was found`);
        }
        const updatedUser = await userModel.findByIdAndUpdate(user._id, {
            saveData: {
                map,
                player,
            },
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
    getUser,
    loadSaveData,
    uploadSaveData,
};
