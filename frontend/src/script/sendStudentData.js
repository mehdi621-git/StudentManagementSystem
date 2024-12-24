
import axios from "axios";

const SendStudentData = (data)=>{
    
   axios.post("http://localhost/backend/studentData.php", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // Display a success message or error message
        if (response.data.error) {
          alert("Error: " + response.data.error);
        } else {
          alert("Student added successfully!");
          // Display teacher's email in a user-friendly format
          alert("Student Email: " + response.data.email + "Id is :" + response.data.student_id) ;
        }
        console.log(response);
      } else {
        alert("Missing entries or invalid data.");
      }
    })
    .catch((error) => {
      alert("Failed to add Student.");
      console.error(error);
    });
}
export default SendStudentData