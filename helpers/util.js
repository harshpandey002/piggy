export const getQueryObject = (filter) => {
  let queryObj = {};
  let sort = {};

  queryObj.userId = filter.id;

  if (!!filter.max) {
    queryObj.amount = { $lte: filter.max, $gte: filter.min };
  }

  if (!!filter.category) {
    queryObj.category = filter.category;
  }

  if (!!filter.note) {
    queryObj.note = { $regex: filter.note, $options: "i" };
  }

  if (!!filter.amount) {
    sort.amount = filter.amount;
  } else {
    sort.createdAt = filter.createdAt;
  }

  return { find: queryObj, sort };
};
