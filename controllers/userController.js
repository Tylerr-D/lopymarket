

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

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({message:"user not found"})
    }
    res.json(user);

}


module.exports = {
    createUser,
    getUser
};