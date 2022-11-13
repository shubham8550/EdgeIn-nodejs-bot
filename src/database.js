import JSONdb from "simple-json-db";

const db = new JSONdb(process.env.JSON_DB_FILE_PATH || "./botDatabase.json");

db.getAllIds = () => {
  // returns all chat ids
  return Object.keys(db.JSON());
};
export default db;

// refer this
// https://www.npmjs.com/package/simple-json-db
