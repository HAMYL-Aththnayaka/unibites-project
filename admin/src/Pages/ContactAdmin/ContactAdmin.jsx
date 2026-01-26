/**
 * Component: ContactAdmin
 * Purpose: Allows Admins to view help requests from students and take action.
 * Actions: Fetch all messages, approve a student (move to help list), or delete a request.
 */

import React, { useState, useEffect } from 'react'
import './ContactAdmin.css'
import api from '../../lib/axios.js'
import { toast } from 'react-toastify'

const ContactAdmin = () => {
  // State to store the list of contact requests fetched from the database
  const [contacts, setContacts] = useState([]);

  /**
   * Function: fetchList
   * Fetches all student contact/help requests on initial load.
   */
  const fetchList = async () => {
    try {
      const response = await api.get('/contact/view')
      if (response.data.success) {
        // Data is stored in 'Data' field from backend response
        setContacts(response.data.Data || [])
        toast.success("Messages Fetched Successfully")
      } else {
        toast.error("Error In Fetching Messages")
      }
    } catch (err) {
      toast.error("Failed to connect to the server")
    }
  }

  /**
   * Function: addHandle
   * Approves a student by adding them to the 'Help' list.
   * If successful, it automatically triggers deletehandle to remove them from the 'Contact' list.
   */
  const addHandle = async (name, registration, id) => {
    try {
      const payload = { name, registration };
      const response = await api.post('/contact/addHelp', payload)

      if (response.data.success) {
        toast.success("Student Added to Help List")
        // Clean up: Remove from the current view since they are now processed
        deletehandle(id) 
      } else {
        toast.error(`Student Was Not Added`)
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while Adding Student");
    }
  }

  /**
   * Function: deletehandle
   * Removes a contact request from the database and updates the local UI state.
   */
  const deletehandle = async (id) => {
    try {
      const response = await api.post(`/contact/remove/${id}`);
      if (response.data.success) {
        // UI Optimization: Filter out the deleted item from state without re-fetching
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

  // Lifecycle: Fetch data once when the component mounts
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='Container'>
      {/* Conditional Rendering: Show message if list is empty */}
      {contacts.length === 0 ? (
        <p className="no-requests">No requests yet </p>
      ) : (
        contacts.map((contact, index) => (
          <div key={index} className="contact-card"> {/* Suggested class for styling */}
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Registration NO:</strong> {contact.registration}</p>
            <p><strong>Faculty:</strong> {contact.faculty}</p>
            <p><strong>Reason:</strong> {contact.reason}</p>
            <p><strong>Recommendation:</strong> {contact.recommendation}</p>
            <p><strong>Scholarship:</strong> {contact.scholarship}</p>
            
            {/* Action Buttons: Add (+) or Delete (X) */}
            <p className="contact-header"> 
              <span className='addlist' title="Add to Help List" onClick={() => addHandle(contact.name, contact.registration, contact._id)}>+</span>
              <span className='close' title="Dismiss" onClick={() => deletehandle(contact._id)}>X</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ContactAdmin;