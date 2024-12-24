
const AddTeacherDetail=(role,setOverFlowTA,setOverlayVisible)=>{
const TeacherOverFlow = {
    FirstName:
      role == "teacher"
        ? { labelName: "First_Name", label: "e.g Mehdi" }
        : { labelName: "First_Name", label: "e.g Mujahid" },
    LastName:
      role == "teacher"
        ? { labelName: "Last_Name", label: "e.g hassan" }
        : { labelName: "Last_Name", label: "e.g Javed" },
    DateOfBirth:
      role == "teacher"
        ? { labelName: "Date_of_Birth", label: "12-4-2000" }
        : { labelName: "Date_of_Birth", label: "23-8-2004" },
    Gender:
      role == "teacher"
        ? { labelName: "Gender", label: "Male" }
        : { labelName: "Gender", label: "Male" },
    PhoneNo:
      role == "teacher"
        ? { labelName: "Phone_No", label: "300xxxxxxx" }
        : { labelName: "Phone_No", label: "97128681" },
    Email:
      role == "teacher"
        ? { labelName: "Email", label: "j@gmail.com" }
        : { labelName: "Email", label: "e@gmail.com" },
    Address:
      role == "teacher"
        ? { labelName: "Address", label: "mda" }
        : { labelName: "Address", label: "mds" },
    Id:
      role == "teacher"
        ? { labelName: "Id", label: "000" }
        : { labelName: "Roll_No", label: "20230-Cpe-11" },
    Department:
      role == "teacher"
        ? { labelName: "Department", label: "Computer engineering" }
        : { labelName: "Department", label: "Computer Engineering" },
    Auth: role == "teacher" ? "Teacher" : "Student",
    Date:
      role == "teacher"
        ? { labelName: "Joining_Date", label: "2024-09-24" }
        : { labelName: "Admission_Date", label: "2024-09-24" },
    Qualification:
      role == "teacher"
        ? { labelName: "Qualification", label: "e.g Software Engineer" }
        : { labelName: "Session", label: "e.g 2023-2027" },
    // role : role == "teacher" ? {Role : "Speciality", label : "e.g Software Engineer"} : {Role : "Session" , label :"e.g 2023-2027"},
    Designation:
      role == "teacher"
        ? { labelName: "Designation", label: "e.g Assistant Professor" }
        : { labelName: "Course", label: "Computer engineering" },
    Experience:
      role == "teacher"
        ? { labelName: "Experience", label: "e.g 5 years+" }
        : { labelName: "Prev_School_details", label: "City Science" },
       Session:role == "teacher" 
        && { labelName: "Session" ,label :"e.g 2023-2027" },
        
    StudyType: role == "student" && {
      labelName: "Study_Type",
      label: "Day_Scholer",
    },
    StudentType: role == "student" && {
      labelName: "Student_Type",
      label: "Fata else Day_Scholar",
    },
  };

  setOverlayVisible(true);
  setOverFlowTA(TeacherOverFlow);
}
export default AddTeacherDetail;