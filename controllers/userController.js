

const User = require("../models/user");

async function createUser(req, res) {

    const {username} = req.body;

    const user = await User.create({
        username
    });

        res.json(user);
}

module.exports = {
    createUser
};