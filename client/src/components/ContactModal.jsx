import React, { useState } from 'react'
import './ContactModal.css'
export default function ContactModal({ isVisible, isEdit, setVisible, getAllContacts, setIsEdit, editContact, setEditContact }) {
    const [error, setError] = useState("");
    const [name, setName] = useState(editContact.name || "");
    const [mobile, setMobile] = useState(editContact.mobile || "");
    const [email, setEmail] = useState(editContact.email || "");

    const addContact = async () => {
        if (!name || !mobile || !email) {
            setError("Please fill all the fields");
            return;
        }
        const response = await fetch('http://localhost:3000/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, mobile, email })
        })
        const data = await response.json()
        if (response.status === 200) {
            setVisible(false);
            getAllContacts();
            setName("");
            setMobile("");
            setEmail("");

            console.log("Contact added successfully");
        } else {
            setError(data.message);
        }
    }

    const saveEditContact = async () => {
        if (!name || !mobile || !email) {
            setError("Please fill all the fields");
            return;
        }
        const response = await fetch(`http://localhost:3000/api/contacts/${editContact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, mobile, email })
        })
        const data = await response.json()
        if (response.status === 200) {
            setVisible(false);
            getAllContacts();
            setName("");
            setMobile("");
            setEmail("");

            console.log("Contact edited successfully");
        } else {
            setError(data.message);
        }
    }


    const handleClose = () => {
        setVisible(false);
        setName("");
        setMobile("");
        setEmail("");
        setError("");
        setEditContact({});
        setIsEdit(false);
    }

    return (
        <div>
            <div className="modal" tabIndex="-1" style={{ display: isVisible ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-h">
                                <h5 className="modal-title">{isEdit ? 'Edit Contact' : 'Add Contact'}</h5>
                                <button type="button" className="btn-close" onClick={handleClose}>Close</button>
                            </div>

                            <input type="text" required className="form-control" placeholder={editContact.name || "Name"} aria-label="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                            <input type="number" required className="form-control" placeholder={editContact.mobile || "Mobile"} aria-label="Mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
                            <input type="mail" required className="form-control" placeholder={editContact.email || "Email"} aria-label="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />

                            {!isEdit && <button type="button" className="btn btn-primary" onClick={addContact}>Create</button>}

                            {isEdit && <button type="button" className="btn btn-primary" onClick={saveEditContact}>Save</button>}
                            {error && <div className="alert alert-danger" role="alert"> {error} </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}