const { v4: uuid } = require("uuid");

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

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((user) => user.id !== id);

      resolve();
    });
  }
}

module.exports = new ContactsRepository();
