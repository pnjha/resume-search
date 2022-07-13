module.exports = {
  operators: {
    AND: "AND",
    OR: "OR",
    "(": "(",
    ")": ")",
    SOL: "SOL"
  },
  precedence: {
    AND: 2,
    OR: 2,
    "(": 1,
    ")": 1,
    SOL: 0
  },
  db_class: {
    SQL: "sql",
    MONGODB: "mongodb"
  }
};
