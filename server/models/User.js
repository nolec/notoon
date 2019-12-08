import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Rounds = 10;
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre("save", function(done) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(Rounds, function(err, salt) {
      if (err) {
        return done(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return done(err);
        }
        user.password = hash;
        done();
      });
    });
  } else {
    console.log("not isModified");
    done();
  }
});

userSchema.methods.comparePassword = function(inputPassword, callback) {
  console.log(inputPassword, this.password, "비교하기전");
  bcrypt.compare(inputPassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, isMatch);
    }
  });
};
userSchema.methods.generateToken = function(callback) {
  let user = this;
  console.log(user._id, "before to hex string");
  let token = jwt.sign(user._id.toHexString(), "secret");
  user.token = token;
  user.save((err, user) => {
    if (err) {
      return callback(err);
    } else {
      callback(null, user);
    }
  });
};

userSchema.statics.findByToken = function(token, callback) {
  let user = this;

  jwt.verify(token, "secret", (err, decode) => {
    console.log(decode, "decode");
    user.findOne({ _id: decode, token }, (err, userData) => {
      if (err) {
        return callback(err);
      }
      callback(null, userData);
    });
  });
};

const model = mongoose.model("User", userSchema);

export default model;
