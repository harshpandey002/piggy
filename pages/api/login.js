import initDB from "@/helpers/initDb";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import bcrypt from "bcryptjs";

initDB();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const error = "Email or password do not match";
    if (!user) {
      res.status(400).json({ error });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      res.status(400).json({ error });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { first_name, last_name } = user;
    res.status(201).json({ token, user: { first_name, last_name, email } });
  } catch (err) {
    console.log(err);
  }
};

export default login;
