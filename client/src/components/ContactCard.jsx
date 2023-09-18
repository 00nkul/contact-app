import React from 'react'
import './ContactCard.css'
export default function ContactCard({ contact, getAllContacts, showModal, setIsEdit, setEditContact, delId, setDelId }) {

    const deleteContact = async () => {
        const response = await fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if (response.status === 200) {
            console.log("Contact deleted successfully");
            getAllContacts();
        } else {
            console.log(data.message);
        }
    }

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setDelId([...delId, contact.id])
        } else {
            setDelId(delId.filter(id => id !== contact.id))
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className='select-checkbox'>
                    <input type="checkbox" onChange={handleCheckbox} />
                </div>
                <h5 className="card-title">{contact.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{contact.mobile}</h6>
                <p className="card-text">{contact.email}</p>

                <div className="btn-group" role="group" >
                    <button type="button" className="btn btn-primary" onClick={() => { setIsEdit(true), showModal(true), setEditContact(contact) }} >Edit</button>
                    <button type="button" className="btn btn-danger" onClick={deleteContact}>Delete</button>
                </div>
            </div>
        </div>
    )
}