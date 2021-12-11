import initDB from "@/helpers/initDb";

initDB();

const signup = async (req, res) => {
  res.status(200).json({ message: "My first route" });
};

export default signup;
