const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();

    return response.json(contacts);
  }

  async show() {
    // Show a contact
  }

  async store() {
    // Create a contact
  }

  async update() {
    // Update a contact
  }

  async delete() {
    // Delete a contact
  }
}

/**
 * This is a singletone pattern when you want to have only one instance of a
 * class in your application.
 */
module.exports = new ContactController();
