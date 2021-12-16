import initDB from "@/helpers/initDb";
import Transaction from "../../models/Transaction";
import Authenticate from "@/helpers/authenticate";

initDB();

const getTransactions = Authenticate(async (req, res) => {
  const body = req.body;
});

const createTransaction = Authenticate(async (req, res) => {
  const body = req.body;
  try {
    const transaction = await Transaction.findOne({ userId: req.userId });
    transaction.transactions.push(body);
    transaction.save();

    res.status(200).json({ transaction: body });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const transaction = (req, res) => {
  switch (req.method) {
    case "GET": {
      getTransactions(req, res);
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
