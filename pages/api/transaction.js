import initDB from "@/helpers/initDb";
import Transaction from "../../models/Transaction";
import Authenticate from "@/helpers/authenticate";

initDB();

const createTransaction = Authenticate(async (req, res) => {
  const body = req.body;
  const transaction = await Transaction.findOne({ user: req.user });
  transaction.transactions.push(body);
  transaction.save();
});

const transaction = (req, res) => {
  switch (req.method) {
    case "GET": {
      break;
    }
    case "POST": {
      createTransaction(req, res);
      break;
    }
    case "PATCH": {
      break;
    }
  }
};

export default transaction;
