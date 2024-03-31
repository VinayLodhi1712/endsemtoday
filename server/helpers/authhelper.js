const bcrypt = require("bcrypt")

async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
};



//for login purpose compare hashpassword and plain password

async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { hashPassword, comparePassword }