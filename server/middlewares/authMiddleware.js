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
    resp.status(404).send({
      success: false,
      message: "error in middleware require login ",
    });
    console.log("error");
  }
}

module.exports = requireSignIn;
