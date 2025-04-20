const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  // Check if user is logged in and has valid access token
  if (req.session.authorization) {
    let token = req.session.authorization["accessToken"];

    // Verify JWT token
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;
        next(); // Proceed to the next middleware
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
};

module.exports = { verifyUser };
