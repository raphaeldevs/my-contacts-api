const getTruthyObject = require("../../helpers/getTruthyObject");

const database = require("../../database");

let contacts = [];

class ContactsRepository {
  async findAll() {
    const rows = await database.query("SELECT * FROM contacts");

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

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((user) => user.id !== id);

      resolve();
    });
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

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updatedContact = getTruthyObject({
        id,
        name,
        email,
        phone,
        category_id,
      });

      contacts = contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      );

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
