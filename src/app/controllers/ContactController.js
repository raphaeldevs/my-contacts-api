const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

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

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    const contactAlreadyExists = Boolean(
      await ContactsRepository.findByEmail(email)
    );

    if (!name) {
      return response.status(409).json({ error: "Name is required" });
    }

    if (contactAlreadyExists) {
      return response
        .status(409)
        .json({ error: "This e-mail is already in use" });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    return response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = Boolean(await ContactsRepository.findById(id));

    if (!contactExists) {
      return response.status(404).json({ error: "Contact not found" });
    }

    if (["", null].includes(name)) {
      return response.status(409).json({ error: "Name is required" });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail) {
      return response
        .status(409)
        .json({ error: "This e-mail is already in use" });
    }

    const updatedContact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    if (!updatedContact) {
      return response.sendStatus(304);
    }

    return response.json(updatedContact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactsRepository.delete(id);

    return response.sendStatus(204);
  }
}

/**
 * This is a singleton pattern, which means your application will have only
 * one instance of this class.
 */
module.exports = new ContactController();
