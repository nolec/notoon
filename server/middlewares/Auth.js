import User from "../models/User";

let auth = (req, res, next) => {
  console.log(req.cookies.token_generate);
  let token = req.cookies.token_generate;
  User.findByToken(token, (err, userData) => {
    if (err) {
      return res.json({ err });
    }
    if (!userData) {
      return res.json({ isAuth: false, error: true });
    }
    req.token = token;
    req.user = userData;
    next();
  });
};

export default auth;
