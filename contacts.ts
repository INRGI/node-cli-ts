import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db/contacts.json");

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

async function listContacts():Promise<Contact[]> {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
}

async function getContactById(contactId:string) : Promise<Contact | null>{
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  return contact || null;
}

async function removeContact(contactId: string) : Promise<Contact| null>{
  const contacts = await listContacts();
  const index = contacts.findIndex((cont) => cont.id === contactId);

  if (index === -1) null;

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name: string, email: string, phone: string): Promise<Contact> {
  const contacts = await listContacts();
  const contact = { name: name, email: email, phone: phone, id: nanoid() };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

export { listContacts, getContactById, removeContact, addContact };
