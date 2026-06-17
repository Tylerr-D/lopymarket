

const User = require("../models/user");

async function createUser(req, res) {

  const { username, email, password } = req.body;

    const user = await User.create({
        username: username,
        email: email,
        password: password
    });

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            coins: user.coins
        });
}

module.exports = {
    createUser
};