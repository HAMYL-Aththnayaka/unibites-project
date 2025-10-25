import React, { useState, useEffect } from 'react'
import './ContactAdmin.css'
import api from '../../lib/axios.js'
import { toast } from 'react-toastify'

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);

  const fetchList = async () => {
    const response = await api.get('/contact/view')
    console.log(response)
    if (response.data.success) {
      setContacts(response.data.Data || [])
      toast.success("Messages Fetched Successfull")
    } else {
      toast.error("Error IN Fetching Meassages")
    }
  }

const addHandle = async(name)=>{
    
}
const deletehandle = async (id) => {
  try {
    const response = await api.post(`/contact/remove/${id}`);
    if (response.data.success) {
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully");
    } else {
      toast.error("Failed to delete contact");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while deleting contact");
  }
};


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
            <p>Name :{contact.name}</p>
            <p>Regitration NO :{contact.registration}</p>
            <p>Faculty :{contact.faculty}</p>
            <p>Reason :{contact.reason}</p>
            <p>Recomendation :{contact.recomendation}</p>
            <p>Recomendation :{contact.scholership}</p>
           <p className="contact-header"> <span className='addlist' onClick={()=>{}}>+</span><span className='close' onClick={() => deletehandle(contact._id)}>X</span></p>

          </div>
        ))
      )}
    </div>
  );
}

export default ContactAdmin;
