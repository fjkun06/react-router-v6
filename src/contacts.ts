import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

type  id = string | number;
interface ContactInterface {
  id: id, 
  createdAt: number
}

export type Contact = ContactInterface[] | null;

export async function getContacts(query?: string | null) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: Contact = await localforage.getItem("contacts");
  // let contacts: Array<object> = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact:ContactInterface = { id, createdAt: Date.now() };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id:id) {
  await fakeNetwork(`contact:${id}`);
  let contacts: Contact = await localforage.getItem("contacts");
  let contact = contacts !== null && contacts.find((contact) => contact.id === id);
  return contact ?? null;
}



export async function updateContact(id: undefined, updates: {}) {
  await fakeNetwork();
  let contacts: Contact = await localforage.getItem("contacts");
  let contact = contacts !== null && contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error("No contact found for", id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}


export async function deleteContact(id: id) {
  
  

  let contacts: Contact = await localforage.getItem("contacts");
  if (contacts !== null) {
    let index = contacts.findIndex((contact) => contact.id === id);
    if (index > -1) {
      contacts.splice(index, 1);
      await set(contacts);
      return true;
    }
  }

  return false;
}

function set(contacts: Contact) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
// interface Empty {}
// let fakeCache = {} as Empty;
let fakeCache: any = {};

async function fakeNetwork(key?: any) {
  if (!key) {
    fakeCache = {};
  }

  if (key && fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
