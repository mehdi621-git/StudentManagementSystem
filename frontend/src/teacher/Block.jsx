import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for React Router v6
import { Context } from '../context';

// Individual session block component
const SessionBlock = ({ sessionName, details, onClick, NoOfStudents, isClicked }) => {
  return (
    <div
      onClick={onClick}
      className={`w-full font-semibold sm:w-72 md:w-96 lg:w-1/4 p-5 text-white rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
        isClicked ? 'bg-orange-600' : 'bg-blue-500' // Toggle color based on click state
      }`}
      role="button"
      tabIndex="0"
    >
      <h2 className="text-2xl font-semibold mb-2">{sessionName}</h2>
      <p className="text-sm mb-2">{details}</p>
      <p className="text-md">Total Students: {NoOfStudents}</p>
    </div>
  );
};

// Main panel component for displaying sessions
const SessionPanel = () => {
  
  const { session, setTsession, sessionId, setsessionId } = useContext(Context);
  const [clickedSessionId, setClickedSessionId] = useState(null); // Track the clicked session
  const navigate = useNavigate(); // React Router v6 navigate function
console.log(session)
  // Handle the session click event and navigate to the session details page
  const handleClick = (sessionId) => {
    setClickedSessionId(sessionId); // Update the clicked session ID
    setsessionId(sessionId); // Update the selected session ID
    // navigate(`/session/${sessionId}`); // Uncomment to enable navigation
  };

  return (
    <div className="flex flex-row flex-wrap gap-6 justify-center p-4 m-2">
      {/* Map through the sessions and display each in a SessionBlock */}
      {session.length > 0 ? (
        session.map((item, i) => (
          <SessionBlock
            key={i} // Use index as key for list items
            sessionName={item.Session}
            details={item.Department}
            onClick={() => handleClick(i)} // Pass session index to handle click
            isClicked={clickedSessionId === i} // Check if the current session is clicked
          />
        ))
      ) : (
        <p className="text-center text-lg text-gray-500">No sessions available</p> // Placeholder if no sessions are available
      )}
    </div>
  );
};
export default SessionPanel