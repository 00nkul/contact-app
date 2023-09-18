import React, { useState } from "react";
import './NavBar.css'

const Navbar = ({ setVisible, download, contacts, setContacts, getAllContacts }) => {

    const [query, setQuery] = useState('');
    const handleSort = () => {
        const sortedContacts = [...contacts].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        })
        setContacts(sortedContacts);
    }

    const handleSearch = () => {
        const filteredContacts = contacts.filter(contact => {
            return contact.name.toLowerCase().includes(query.toLowerCase())
        })
        setContacts(filteredContacts);
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">Contacts</div>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item search-bar">
                    <input type="text" className="search" placeholder="Search" onChange={(e) => { setQuery(e.target.value) }} />
                    <button className="btn" onClick={handleSearch} >🔍</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-primary" onClick={() => { setVisible(true) }}>Add Contact</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-primary" onClick={() => { download() }} >Download All</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-primary" onClick={handleSort}>Sort </button>
                </li>
                <li className="nav-item">
                    <button className="btn" onClick={() => { getAllContacts() }}>Refresh </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
