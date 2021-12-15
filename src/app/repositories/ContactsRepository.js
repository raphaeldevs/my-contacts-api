const getTruthyObject = require("../../helpers/getTruthyObject");

const database = require("../../database");

class ContactsRepository {
  async findAll(orderByQuery = "ASC") {
    const orderBy = ["ASC", "DESC"].includes(orderByQuery.toUpperCase())
      ? orderByQuery
      : "ASC";

    const rows = await database.query(
      `SELECT * FROM contacts ORDER BY name ${orderBy}`
    );

    return rows;
  }

  async findById(id) {
    const [row] = await database.query(
      `
        SELECT * FROM contacts WHERE id = $1
      `,
      [id]
    );

    return row;
  }

  async findByEmail(email) {
    const [row] = await database.query(
      `
        SELECT * FROM contacts WHERE email = $1
      `,
      [email]
    );

    return row;
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await database.query(
      `
        INSERT INTO contacts (name, email, phone, category_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [name, email, phone, category_id]
    );

    return row;
  }

  async update(id, { name, email, phone, category_id }) {
    const data = getTruthyObject({
      name,
      email,
      phone,
      category_id,
    });

    if (Object.keys(data).length <= 0) {
      return null;
    }

    const columnsToUpdate = Object.keys(data)
      .map((column, index) => `${column} = $${index + 1}`)
      .join(", ");

    const [row] = await database.query(
      `
        UPDATE contacts
        SET ${columnsToUpdate}
        WHERE id = $${Object.keys(data).length + 1}
        RETURNING *
      `,
      [...Object.values(data), id]
    );

    return row;
  }

  async delete(id) {
    const deleteOperation = await database.query(
      `DELETE FROM contacts WHERE id = $1`,
      [id]
    );

    return deleteOperation;
  }
}

module.exports = new ContactsRepository();
