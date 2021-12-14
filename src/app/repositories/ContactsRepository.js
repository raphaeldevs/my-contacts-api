const { v4: uuid } = require("uuid");

const getTruthyObject = require("../../helpers/getTruthyObject");

const database = require("../../database");

let contacts = [
  {
    id: uuid(),
    name: "Rapha",
    email: "eu@raphaeldevs.com.br",
    phone: "0000000000000",
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: "Diego",
    email: "diego@reddevs.com.br",
    phone: "0000000000000",
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
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
