import Budget from "@/models/Budget";
import Transaction from "@/models/Transaction";
import initDB from "@/helpers/initDb";
import { calcBudget } from "@/helpers/calc";
import Authenticate from "@/helpers/authenticate";

const budgetDetail = Authenticate(async (req, res) => {
  const id = req.query.id;
  try {
    let budget = await Budget.find({ _id: id });
    budget = JSON.parse(JSON.stringify(budget));
    budget = await calcBudget(budget);

    res.status(200).json({ transactions: [], chart: [], detail: budget[0] });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

export default budgetDetail;
