const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4} = require('uuid');

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        console.table(contacts);
    } catch (error) {
        console.error(error);
    }
};
  
const getContactById = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const contact = contacts.find(contact => contact.id === contactId);

        if(!contact){
            console.log(`Contact with id "${contactId}" not found!`);
            return;
        } 
        console.table(contact);
    } catch (error) {
        console.error(error)
    }
};
  
const removeContact = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const filterContacts = contacts.filter(contact => contact.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(filterContacts));
        console.log(`Contacts with id "${contactId}" removed!`);
        console.table(filterContacts);
    } catch (error) {
        console.error(error);
    }
};
  
const addContact = async (name, email, phone) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const newContact = {id:uuidv4(), name, email, phone};
        contacts.push(newContact);
        fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log(`Contact ${name} added!`);
        console.table(contacts);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};

