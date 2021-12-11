import initDB from "@/helpers/initDb";

initDB();

const login = async (req, res) => {
  res.status(200).json({ name: "John Doe" });
};

export default login;
