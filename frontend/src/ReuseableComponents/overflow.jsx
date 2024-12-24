import React, { useState, useContext, useEffect } from "react";
import Inputfield from "./input";
import { Context } from "../context";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import AddTeacherDetail from "../script/teacher";
import SendTeacherData from "../script/sendteacherData";
import { BiSolidImageAdd } from "react-icons/bi";
import isValidDate from "../script/dateValidate";
import SendStudentData from "../script/sendStudentData";
const ParentComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submit, setsubmit] = useState(true);
  const [value,setvalue]=useState('')
  const { OverFlowTA, setOverFlowTA, OverlayVisible, setOverlayVisible } =
    useContext(Context);
  console.log(OverFlowTA);
  const contents = [
    [
      OverFlowTA.FirstName,
      OverFlowTA.LastName,
      OverFlowTA.DateOfBirth,
      OverFlowTA.Gender,
      OverFlowTA.PhoneNo,
      OverFlowTA.Email,
      OverFlowTA.Address,
    ],
    OverFlowTA.Auth == "Teacher"
      ? [
          OverFlowTA.Id,
          OverFlowTA.Department,
          OverFlowTA.Date,
          OverFlowTA.Designation,
          OverFlowTA.Experience,
          OverFlowTA.Qualification,
          OverFlowTA.Session,

        ]
      : [
          OverFlowTA.Id,
          OverFlowTA.Department,
          OverFlowTA.Date,
          OverFlowTA.Designation,
          OverFlowTA.StudyType,
          OverFlowTA.StudentType,
          OverFlowTA.Experience,
          OverFlowTA.Qualification,
        ],
  ];
  const backOverlay = () => {
    if (currentIndex != 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1) % contents.length);
      console.log(currentIndex);
    }
  };
  const showOverlay = () => setOverlayVisible(true);
  const hideOverlay = () => {
    setOverlayVisible(false);
    setCurrentIndex(0);
    setPage1Data(initialPAge1)
    setPage2Data(initialPAge2)
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
  };
  useEffect(() => {
    console.log("o", currentIndex);
    if (currentIndex == contents.length - 1) {
      console.log("C", currentIndex);
      setsubmit(false);
    } else {
      setsubmit(true); // Loop back to start
    }
  }, [currentIndex]);
  const initialPAge1={
      First_Name:"",
      Last_Name :"",
      Date_of_Birth:"",
      Gender :"",
      Phone_No: "",
      Email : "",
      Address : "",
  }
let initialPAge2;
    OverFlowTA.Auth == "Teacher" 
    ? 
    initialPAge2={
    Id:"",
    Department:"",
    Joining_Date:"",
    Designation:"",
    Experience : "",
    Qualification:"", 
    Session:""

}:initialPAge2={
  Roll_No:"",
  Department:"",
  Admission_Date:"",
  Course : "",
  Study_Type:"",
  Student_Type :"",
  Prev_School_details:"",  
  Session:"",
  
  

}

  const [page1Data, setPage1Data] = useState(initialPAge1);
const [page2Data, setPage2Data] = useState(initialPAge2);
const [imageS,setImageS] =useState("")
const handleImage = (e)=>{
   const file = e.target.files[0];
    console.log("Selected file:", file);
    setImageS(e.target.files[0])
}
  const handleChange=(e,a)=>{
    console.log("current",currentIndex)
          const {name,value} =e.target;
          if (currentIndex === 0) {
          setPage1Data((prev)=>({...prev,[name]:value}))
          
          }
          else if (currentIndex === 1) {
            
            setPage2Data((prevData) => ({
              ...prevData,
              [name]: value,
            }));  }}
            const handleSubmit =(e)=>{
              e.preventDefault();
              
         const data = {...page1Data,...page2Data }
         console.log("data",data)  
  const Fdata = new FormData();

  // Append all data from the merged object
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      Fdata.append(key, data[key]);
    }
  }
for (let pair of Fdata.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
  // If an image is selected, append it to the FormData
  if (imageS) {
    Fdata.append("image", imageS);  // Append the image to the FormData
  }
//   if(!isValidDate(data.Joining_Date
// )){
if(OverFlowTA.Auth == "Teacher"){
  SendTeacherData(Fdata)

}else {
  SendStudentData(Fdata)
 console.log(Fdata)
}
// }else{
//   alert("Wrong date format at Joining Date")
// }
       console.log(Fdata)
            }

  console.log("1",page1Data)
  console.log("2",page2Data)
  return (
    <div>
      {OverlayVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-[50%] ">
            <h3 className="font-bold text-center mb-1">
              New {OverFlowTA.Auth} Form
            </h3>
         <label htmlFor="image">
         <BiSolidImageAdd size={25} color="blue" className="float-right"/>
         </label>
         <input name="image" id="image" type="file" className="hidden" onChange={(e)=>handleImage(e)} />

            {contents[currentIndex].map((item,i) => (
              
              <Inputfield inputRequired= {true} inputType={item.labelName == "Joining_Date" || item.labelName == "Admission_Date" ||item.labelName =="Date_of_Birth" ? "date" : "text"} key={currentIndex+i*i} labelname={item.labelName} labelfor={ item.labelName} Value ={currentIndex === 0 ? page1Data[item.labelName] : page2Data[item.labelName] } onchange={(e)=>handleChange(e,item.labelName)}  placeholder={item.label}>
              </Inputfield>
            ))}
              
            <div className={`flex  mt-2 gap-4 ${currentIndex>0 ?"justify-between w-full" : "justify-center"}`}>
             { currentIndex > 0 && <button
                onClick={backOverlay}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                <FaArrowAltCircleLeft />
              </button>}
              {submit ? (
                <button
                  onClick={handleNext}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  <FaArrowAltCircleRight />
                </button>
              ) : (
                <button
                  onClick={(e)=>handleSubmit(e)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              )}
              
              <button
                onClick={hideOverlay}
                className="bg-red-500 text-white px-1 py-1 rounded-full absolute -top-3  -right-3"
              >
                <IoCloseCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
