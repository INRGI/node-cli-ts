import { program } from "commander";
import { addContact, getContactById, listContacts, removeContact } from "../contacts.js";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

interface Action{
    action: string,
    id?: string,
    name?: string,
    email?: string,
    phone?: string,
}

async function invokeAction({ action, id, name, email, phone }: Action) {
    switch (action) {
        case "list":
            const list = await listContacts();
            return console.table(list);

        case "get":
            if (!id) return console.log('Id is required');
            const oneContact = await getContactById(id);
            return console.log(oneContact);

        case "add":
            if (!name || !email || !phone) return console.log('All parameters are required');
            const newContact = await addContact(name, email, phone);
            return console.log(newContact);
        case "remove":
            if (!id) return console.log('Id is required');
            const deletedContact = await removeContact(id);
            return console.log(deletedContact);

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options as Action);