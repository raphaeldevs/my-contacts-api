const { v4: uuid } = require("uuid");

const contacts = [
  {
    id: uuid(),
    name: "Rapha",
    email: "eu@raphaeldevs.com.br",
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
}

module.exports = new ContactsRepository();
