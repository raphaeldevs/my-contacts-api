const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();

    return response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "Contact not found" });
    }

    return response.json(contact);
  }

  async store() {
    // Create a contact
  }

  async update() {
    // Update a contact
  }

  async delete(request, response) {
    const { id } = request.params;

    const contactExists = Boolean(await ContactsRepository.findById(id));

    if (!contactExists) {
      return response.status(404).json({ error: "Contact not found" });
    }

    await ContactsRepository.delete(id);

    return response.sendStatus(204);
  }
}

/**
 * This is a singletone pattern when you want to have only one instance of a
 * class in your application.
 */
module.exports = new ContactController();
