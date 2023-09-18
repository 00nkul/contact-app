import { useEffect, useState } from 'react';
import './App.css'
import NavBar from './components/NavBar';
import ContactCard from './components/ContactCard';
import ContactModal from './components/ContactModal';
import * as XLSX from 'xlsx';

function App() {

  const [contacts, setContacts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContact, setEditContact] = useState({});
  const [delId, setDelId] = useState([]);

  const getAllContacts = async () => {
    const response = await fetch('http://localhost:3000/api/contacts')
    const data = await response.json()
    console.log(data)
    setContacts(data);
  }

  const handleDeleteAllSelected = async () => {
    const response = await fetch('http://localhost:3000/api/contacts/deleteMultiple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ delId })
    })
    if (response.status === 200) {
      console.log("Contact deleted successfully");
      getAllContacts();
      setDelId([]);
    } else {
      console.log(data.message);
    }
  }

  const downLoadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(contacts);
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, "contacts.xlsx");
  }

  useEffect(() => {
    getAllContacts()
  }, []);

  useEffect(() => {
    console.log(delId, "delId");
  }, [delId]);

  return (
    <div className='container'>
      <NavBar setVisible={setVisible} download={downLoadExcel} contacts={contacts} setContacts={setContacts} getAllContacts={getAllContacts}/>

      <h1 className="display-4">Contact List</h1>
      <div className="card-container">
        {
          contacts.map(contact => {
            return <ContactCard key={contact._id} contact={contact} getAllContacts={getAllContacts} showModal={setVisible} setIsEdit={setIsEdit} setEditContact={setEditContact} delId={delId} setDelId={setDelId} />
          })
        }
      </div>

      {
        delId.length > 0 &&
        <div className="sticky-bottom">
          <button type="button" className="btn btn-danger" onClick={handleDeleteAllSelected}>Delete All Selected</button>
        </div>
      }
      <ContactModal isVisible={visible} setVisible={setVisible} getAllContacts={getAllContacts} isEdit={isEdit} setIsEdit={setIsEdit} editContact={editContact} setEditContact={setEditContact} />
    </div>
  )
}

export default App
