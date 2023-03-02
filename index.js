const operations = require('./contacts');
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contacts id")
  .option("-n, --name <type>", "contacts name")
  .option("-e, --email <type>", "contacts email")
  .option("-p, --phone <type>", "contacts phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
        const contactsList = await operations.listContacts();
        console.table(contactsList);
        break;

    case "get":
        const contact = await operations.getContactById(id);
        console.table(contact);
        break;

    case "add":
        const newContact = await operations.addContact(name, email, phone);
        console.table(newContact);
        break;

    case "remove":
        const removedContact = await operations.removeContact(id);
        // console.log(removedContact);
        break;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(argv);