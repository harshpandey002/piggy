import initDB from "@/helpers/initDb";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import bcrypt from "bcryptjs";

initDB();

const signup = async (req, res) => {
  const { first, last, email, password } = JSON.parse(req.body);

  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
      return res.status(422).json({ error: "This email already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await new User({
      first_name: first,
      last_name: last,
      email,
      password: hashedPass,
    }).save();
    await new Transaction({ user: newUser._id }).save();
    res.status(201).json({ message: "Signup success" });
  } catch (err) {
    console.log(err);
  }
};

export default signup;
