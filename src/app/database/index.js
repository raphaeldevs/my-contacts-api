const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "mycontacts",
});

exports.query = async (query) => {
  const { rows } = await client.query(query);

  return rows;
};

(async () => {
  await client.connect();

  console.log("📁 Hello, I'm database!");
})();
