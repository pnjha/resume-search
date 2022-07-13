"use strict";

const { sqlQueryGenerator } = require("./sql-generator");
const { mongoDBQueryGenerator } = require("./mongodb-generator");
const { db_class: dbClass } = require("../config/properties");

function getGenerator(targetDbClass) {
  switch (targetDbClass) {
    case dbClass.SQL:
      return sqlQueryGenerator;
    case dbClass.MONGODB:
      return mongoDBQueryGenerator;
    default:
      return new Error(`Invalid db class : ${targetDbClass}`);
  }
}

module.exports = { getGenerator };
