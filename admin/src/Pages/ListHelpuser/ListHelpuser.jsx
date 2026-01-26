/**
 * Component: ListHelpuser
 * Purpose: Displays a list of students currently receiving help.
 * Actions: Fetches the help list on mount and allows removal of students from the program.
 */

import React, { useEffect, useState } from 'react';
import './ListHelpuser.css';
import api from '../../lib/axios';
import { toast } from 'react-toastify';

const ListHelpuser = () => {
  // State to store student records (Array of objects)
  const [helpList, setHelpList] = useState([]);

  /**
   * Function: fetchHelpList
   * Description: Calls the backend to retrieve all students in the help database.
   * Logic: Updates the local 'helpList' state if the API call is successful.
   */
  const fetchHelpList = async () => {
    try {
      const response = await api.get('/helpuser/view');

      if (response.data.success) {
        // Accessing the 'Data' property from the response object
        setHelpList(response.data.Data);
        toast.success("Data Fetched Successfully");
      } else {
        toast.error("Error Occurred During Fetching Users");
      }
    } catch (err) {
      // Basic error logging for debugging purposes
      console.log(err.toString());
      toast.error("Something Went Wrong");
    }
  };

  /**
   * Function: removeStudent
   * Description: Removes a student by ID via a POST request.
   * Logic: Performs "Optimistic UI Updates" by filtering the student out of the 
   * current state immediately upon receiving a valid response.
   */
  const removeStudent = async (id) => {
    try {
      const response = await api.post(`/helpuser/removehelp/${id}`);
      
      if (response) {
        toast.success("User Removed");
        // Update state locally so the row disappears without a page refresh
        setHelpList(helpList.filter(student => student._id !== id));
      } else {
        toast.error("Error In removing User");
      }
    } catch (err) {
      toast.error("Failed to remove student");
    }
  };

  /**
   * Lifecycle: useEffect
   * Trigger: Runs once when the component is first mounted to the DOM.
   */
  useEffect(() => {
    fetchHelpList();
  }, []);

  return (
    <div className="help-list-container">
      <div className="help-list-table">
        
        {/* Table Header Definitions */}
        <div className="help-list-header">
          <span>Name</span>
          <span>Registration</span>
          <span>Action</span>
        </div>

        {/* Dynamic Row Rendering */}
        {helpList.map((student, index) => (
          <div key={index} className="help-list-row">
            <span>{student.name}</span>
            <span>{student.registration}</span>
            {/* Click event triggers the student removal logic */}
            <span 
              className="help-list-remove" 
              onClick={() => removeStudent(student._id)}
              style={{ cursor: 'pointer' }}
            >
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHelpuser;