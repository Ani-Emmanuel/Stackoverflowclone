const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

//function for hashing password before storing
const hashOperation = async password => {
    const salt = await bcript.getSalt(10)
    const hashedpass = await bcript.hash(password, salt);
    return hashedpass
}

//function for comparing user password with database password
const comparePass = async (password, hashedpass) => {
    const passwordChecker = await bcript.compare(password, hashedpass)
    return passwordChecker;
}

//function for generating jsonwebtoken using user Id
const tokenGen = async id => {
    const token = await jwt.sign(id, process.env.SECRET)
    return token;
}

module.exports = { hashOperation, comparePass, token }