import axios from "axios";
export const GetTeacherData =()=>{
    return axios.get("http://localhost/backend/getteacherData.php")
    .then((response) => {
        console.log(response.data)
        const teachers = response.data; // Array of teacher records
        console.log("Teachers:", teachers);
        return teachers
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        return []
      });
}
export const UpdateTeacherData = (data)=>{
  axios
    .post("http://localhost/backend/UpdateteacherData.php", data)
    .then((response) => {
      alert("Data updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    });
}
export const deleteTeacher = async (id) => {
  try {
      // Send DELETE request with ID as a query parameter
      const response = await axios.delete(`http://localhost/backend/deleteteacherData.php?id=${id}`);
return response
      // Handle success
     // Success message from PHP

      // Optionally, you can refresh the page or update the UI to reflect the deletion
  } catch (error) {
      // Handle error
      return error.message
      console.error("There was an error deleting the teacher:", error);
  }
};
export const GetStudentData =()=>{
  return axios.get("http://localhost/backend/getStudentData.php")
  .then((response) => {
      console.log(response.data)
      const teachers = response.data; // Array of teacher records
      console.log("Students:", teachers);
      return teachers
    })
    .catch((error) => {
      console.error("Error fetching Students:", error);
      return []
    });
}
export const UpdateStudentData = (data)=>{
 return axios
    .post("http://localhost/backend/UpdateStudentData.php", data)
    .then((response) => {
      if(response.status == 200){
      return  alert("Data updated successfully!");

      }else{
        alert("Data could not updated ; Try Again ")
      }
    })
    .catch((error) => {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    });
}
export const deleteStudent = async (id) => {
  try {
      // Send DELETE request with ID as a query parameter
      const response = await axios.delete(`http://localhost/backend/deleteStudentData.php?id=${id}`);
return response
      // Handle success
     // Success message from PHP

      // Optionally, you can refresh the page or update the UI to reflect the deletion
  } catch (error) {
      // Handle error
      return error.message
      console.error("There was an error deleting the teacher:", error);
  }
};
