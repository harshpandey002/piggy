import initDB from "@/helpers/initDb";

initDB();

const signup = async (req, res) => {
  const { first, last, email, password } = JSON.parse(req.body);
  const message = `Hello ${first} ${last}`;
  res.status(200).json({ message });
};

export default signup;
