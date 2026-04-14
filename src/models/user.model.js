import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { use } from "react";
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    fullname: {
      type: String,
      index: true,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken=function(){
  jwt.sign({
    _id : this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname,
  },
  process.env.ACCESS_TOKEN_SECRET,{
    expiresIn : ACCESS_TOKEN_EXPIRY
  }
)
}
userSchema.methods.generateRefreshToken=function(){
  jwt.sign({
    _id : this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname,
  },
  process.env.REFRESH_TOKEN_SECRET,{
    expiresIn : REFRESH_TOKEN_EXPIRY
  })
}
export const User = mongoose.model("User", userSchema);
