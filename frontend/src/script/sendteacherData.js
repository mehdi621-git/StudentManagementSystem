import axios from "axios";

const SendTeacherData = (data) => {
  axios
    .post("http://localhost/backend/teacherData.php", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // Check for error from the backend
        if (response.data.error) {
          alert("Error: " + (response.data.error || response.data));
        } else {
          alert("Teacher added successfully!");
          
          // Check if 'data' has the correct properties and display them
    
        }
        console.log(response);
      } else {
        alert("Missing entries or invalid data.");
      }
    })
    .catch((error) => {
      // Handle error cases with more descriptive messages
      alert("Failed to add teacher. Please try again later.");
      console.error("Error details:", error.message);
    });
};

export default SendTeacherData;
