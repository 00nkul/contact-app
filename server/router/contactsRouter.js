import express from 'express';
import fs from 'fs';

const contactsRouter = express.Router();
const datapath = './contacts.json';

const readContacts = () => {
    return JSON.parse(fs.readFileSync(datapath));
};

contactsRouter.get('/', (req, res) => {
    const contacts = readContacts();
    res.send(contacts);
});

contactsRouter.get('/:id', (req, res) => {
    const contacts = readContacts();
    const contact = contacts.find(contact => contact.id === parseInt(req.params.id));
    res.send(contact);
});

contactsRouter.post('/', (req, res) => {
    const contacts = readContacts();
    const contact = req.body;
    contact.id = contacts.length + 1;
    contacts.push(contact);
    fs.writeFileSync(datapath, JSON.stringify(contacts));
    res.status(200);
    res.send(contact);
});

contactsRouter.put('/:id', (req, res) => {
    const contacts = readContacts();
    const contact = contacts.find(contact => contact.id === parseInt(req.params.id));
    Object.assign(contact , req.body)
    fs.writeFileSync(datapath, JSON.stringify(contacts));
    res.status(200);
    res.send(contact);
});

contactsRouter.delete('/:id', (req, res) => {
    
    console.log("delete_single_method");
    const contacts = readContacts();
    const contact = contacts.find(contact => contact.id === parseInt(req.params.id));
    const index = contacts.indexOf(contact);
    contacts.splice(index, 1);
    fs.writeFileSync(datapath, JSON.stringify(contacts));
    res.status(200);
    res.send(contact);
});

// route for deleting multiple contacts
contactsRouter.post('/deleteMultiple', (req, res) => {
    const contacts = readContacts();
    console.log(req.body , "ids");
    const contactIds = req.body.delId;
    const newContacts = contacts.filter(contact => !contactIds.includes(contact.id));
    fs.writeFileSync(datapath, JSON.stringify(newContacts));
    res.status(200)
    res.send({"Deleted": "Success"});
});

export default contactsRouter;