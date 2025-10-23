import React, { useState, useEffect } from 'react'
import './ContactAdmin.css'
import api from '../../lib/axios.js'
import { toast } from 'react-toastify'

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);

  const fetchList = async () => {
    const response = await api.get('/contact/view')

    if (response.data.success) {
      setContacts(response.data.Data || [])
      toast.success("Messages Fetched Successfull")
    } else {
      toast.error("Error IN Fetching Meassages")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='Container'>
      {contacts.length === 0 ? (
        <p className="no-requests">No requests yet </p>
      ) : (
        contacts.map((contact, index) => (
          <div key={index} className="">
            <p>{contact.name}</p>
            <p>{contact.registration}</p>
            <p>{contact.faculty}</p>
            <p>{contact.reason}</p>
            <p>{contact.recomendation}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ContactAdmin;
