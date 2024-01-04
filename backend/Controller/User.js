import cloudinary from "../Cloudinary.js";
import User from "../Model/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/Error.js";
import Jwt from "jsonwebtoken";

//=================REGISTER USER====================//
const uploadImage = async (file) => {
  const folder = "images";
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder,
  });
  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};
export const RegisterUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user;
    const hashPassword = bcryptjs.hashSync(password, 10);
    if (!req.files || !req.files.img) {
      // No image present, create user without image
      user = new User({
        name,
        email,
        password: hashPassword,
      });
    } else {
      const imageInfo = await uploadImage(req.files.img);
      user = new User({
        name,
        email,
        password: hashPassword,
        pic: imageInfo,
      });
    }
    console.log("jj", req.body);
    const userExist = await User.findOne({ email });

    if (userExist) {
      next(errorHandler(400, "This email already exist"));
    }

    await user.save();
    res.status(200).json({
      msg: "User register Successfully!!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//======================LOGIN USER======================//
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User not found"));
    }
    const ComparePass = bcryptjs.compareSync(password, validUser.password);
    if (!ComparePass) {
      next(errorHandler(401, "Inavlid Credentials"));
    } else {
      const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...otherDeatils } = validUser._doc;

      return res.status(200).json({
        users: { otherDeatils, token },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
