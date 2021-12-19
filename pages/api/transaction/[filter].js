import initDB from "@/helpers/initDb";
// import Transaction from "../../models/Transaction";
import Authenticate from "@/helpers/authenticate";
import chalk from "chalk";

initDB();

const getTransactions = Authenticate(async (req, res) => {
  const query = req.query;
  console.log(JSON.parse(query.filter));

  res.status(200).json({ message: "Request Successfull" });

  //   try {
  //     const transactions = await Transaction.find({ userId: req.userId }).sort({
  //       createdAt: 1,
  //     });
  //     res.status(200).json({ transactions });
  //   } catch (e) {
  //     res.status(400).json({ error: e });
  //   }
});

const transaction = (req, res) => {
  switch (req.method) {
    case "GET": {
      console.log("api ");
      getTransactions(req, res);
      break;
    }
  }
};

export default transaction;
