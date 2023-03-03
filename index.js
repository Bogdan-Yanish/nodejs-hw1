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

function invokeAction ({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        operations.listContacts();
        break;

    case "get":
        operations.getContactById(id);
        break;

    case "add":
        operations.addContact(name, email, phone);
        break;

    case "remove":
        operations.removeContact(id);        
        break;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(argv);