import initDB from "@/helpers/initDb";
import User from "@/models/User";
import Setting from "@/models/Setting";
import { fiveYears } from "@/util/util";
import bcrypt from "bcryptjs";

initDB();

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: "This email already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: hashedPass,
    }).save();

    await new Setting({
      userId: newUser._id,
      initialBalance: 0,
      returns: 0,
      futureDate: fiveYears(),
    }).save();
    res.status(201).json({ message: "Signup success" });
  } catch (err) {
    console.log(err);
  }
};

export default signup;
