import initDB from "@/helpers/initDb";
import Transaction from "../../../models/Transaction";
import Authenticate from "@/helpers/authenticate";
import { getQueryObject } from "@/helpers/util";
import chalk from "chalk";

initDB();

const getTransactions = Authenticate(async (req, res) => {
  let filter = req.query;
  filter = JSON.parse(filter.filter);
  filter.id = req.userId;
  const { find, sort, limit } = getQueryObject(filter);

  try {
    const transactions = await Transaction.find({
      ...find,
    })
      .sort({
        ...sort,
      })
      .limit(limit);

    res.status(200).json({ transactions });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const deleteTransaction = Authenticate(async (req, res) => {
  const id = req.query.filter;
  try {
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Delete Sucessful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

const transaction = (req, res) => {
  switch (req.method) {
    case "GET": {
      getTransactions(req, res);
      break;
    }
    case "DELETE": {
      deleteTransaction(req, res);
      break;
    }
  }
};

export default transaction;
