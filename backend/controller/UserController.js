import UserModel from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "The user already exists" });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Save the user with Mongoose
    const newUser = await UserModel.create({
      email,
      password: hash,
    });

    // Create JWT token with the new user’s Mongo _id
    const token = jwt.sign(
      { id: newUser._id }, // ✅ _id from Mongoose doc
      process.env.JWT_SECRET
      // { expiresIn: "1h" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set to true in production with HTTPS
    });

    res.status(200).json({
      message: "User registered successfully",
      redirect: "/expenses",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error storing the user", error });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return res.status(500).json({ message: "The user does not exists" });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
      return res.status(500).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: userExists._id,
      },
      process.env.JWT_SECRET

      // { expiresIn: "1hr" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      message: "Login successful",
      redirect: "/expenses",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error storing the user ", error });
  }
};

export const logoutUser = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set to true in production with HTTPS
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during logout", error });
  }
};
