const usermodel = require("../modles/usermodel");
async function IsAdmin(req, resp, next) {
  try {
    
    const user = await usermodel.findById(req.user._id);
    console.log('User found:', user);

    if (!user || user.Role !== 1) {
      resp.status(403).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      console.log('User found:', user);
      next();
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send({
      success: false,
      message: "Error in middleware",
    });
  }
}

module.exports = IsAdmin;
