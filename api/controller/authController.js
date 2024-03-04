import jwt from "jsonwebtoken";
export const verifyJWT = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(403).send("You are not authorized");
  //console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(403).send("You are  authorized");
    req.user = user;
    //console.log(req.user);
  });
  next();
};

export const verifyAdmin = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.user.isAdmin) next();
    else res.status(403).send("You are not authorized ");
  });
};
