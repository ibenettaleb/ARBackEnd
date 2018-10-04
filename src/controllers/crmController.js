import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);
console.log('TCL: Contact', Contact);

export const addNewContact = (req, res) => {

    let newContact = new Contact(req.body);
    console.log('TCL: exportaddNewContact -> newContact', newContact);

    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

export const getContacts = (req, res) => {
    Contact.find({}, (err, contact) => {
        if (err) {
            console.log('TCL: getContacts -> err', err);
            res.send(err)
        }
        res.json(contact)
    });
};

export const getContactWithID = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json(contact)
    });
};

export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json(contact)
    })
};

export const deleteContact = (req, res) => {
    Contact.remove({_id: req.params.contactId}, (err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json ({ message: 'Successfully deleted contact' });
    })
};
