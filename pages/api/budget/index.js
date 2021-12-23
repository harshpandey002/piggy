import Budget from "@/models/Budget";
import initDB from "@/helpers/initDb";
import Authenticate from "@/helpers/authenticate";

initDB();

const getBudget = Authenticate(async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId });
    res.status(200).json({ budgets });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const createBudget = Authenticate(async (req, res) => {
  const { startDate, endDate, category, limit } = req.body;

  try {
    const newBudget = await new Budget({
      userId: req.userId,
      category,
      startDate,
      endDate,
      limit,
    }).save();
    res.status(200).json({ newBudget });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const deleteBudget = Authenticate(async (req, res) => {
  console.log("DELETE Request");
  res.status(200).json({ message: "Deleted" });
});

const budget = (req, res) => {
  switch (req.method) {
    case "GET":
      getBudget(req, res);
      break;
    case "POST":
      createBudget(req, res);
      break;
    case "DELETE":
      deleteBudget(req, res);
      break;
  }
};

export default budget;
