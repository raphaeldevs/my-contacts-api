class ContactController {
  index(request, response) {
    // List all contacts

    response.send("List all contacts");
  }

  show() {
    // Show a contact
  }

  store() {
    // Create a contact
  }

  update() {
    // Update a contact
  }

  delete() {
    // Delete a contact
  }
}

/**
 * This is a singletone pattern when you want to have only one instance of a
 * class in your application.
 */
module.exports = new ContactController();
