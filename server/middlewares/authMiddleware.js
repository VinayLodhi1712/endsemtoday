const JWT = require("jsonwebtoken");

//protected route

async function requireSignIn(req, resp, next) {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {   
    console.log(error);
    resp.status(404).send({
      success: false,
      message: "error in middleware require login ",
    });
  }
}

module.exports = requireSignIn;
