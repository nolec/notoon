import express from "express";
import User from "../models/User";
import Auth from "../middlewares/Auth";

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: "등록에 실패했습니다." });
    }
    res.status(200).json({ success: true, userData });
  });
});
userRouter.get("/auth", Auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  });
});
userRouter.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, userData) => {
    if (!userData) {
      return res.json({
        loginSuccess: false,
        message: "등록 된 email이 없습니다."
      });
    }
    console.log(`login이요 ${req.body.password}`);
    userData.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        });
      }
      //token생성
      userData.generateToken((err, user) => {
        if (err) return res.status(400).json({ err });
        res
          .cookie("token_generate", user.token)
          .status(200)
          .json({ loginSuccess: true, user });
      });
    });
  });
});
userRouter.get("/logout", Auth, (req, res) => {
  console.log(`${req}req logout`);
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: undefined },
    (err, userData) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true
      });
    }
  );
});

export default userRouter;
