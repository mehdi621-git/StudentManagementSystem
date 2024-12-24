import { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import axios from "axios";

const Tasks = () => {
  const { sessionId, session ,Steacher,setSingleTeacher,id} = useContext(Context);
  const students = session[sessionId]?.Students || []; // Fetch students of the current session

  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState({});
  const [marks, setMarks] = useState({});
  const [teacherName, setTeacherName] = useState("John Doe"); // Replace with dynamic teacher name if needed
  const [loading, setLoading] = useState(true);
  
  // Handle form inputs  useEffect(() => {
    useEffect(() => {
        const fetchTeacherData = async () => {
          try {
            const response = await axios.get(
              `http://localhost/backend/getteacherData.php?teacher_id=${id}`
            );
            if (response.data.error) {
              setError(response.data.error);
            } else {
                console.log(response.data)
              setTeacherName(response.data[0]);
            }
          } catch (err) {
            setError('Failed to fetch teacher data');
          } finally {
            setLoading(false);
          }
        };
    
        fetchTeacherData();
      }, [id]);
  useEffect(() => {

    // Fetch tasks on page load
    axios
      .get("http://localhost/backend/fetch_tasks.php") // Adjust the URL accordingly
      .then((response) => {
        console.log(response.data)
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  // Handle task selection change
  const handleTaskSelection = (studentId, taskId) => {
    setSelectedTasks((prevSelectedTasks) => ({
      ...prevSelectedTasks,
      [studentId]: taskId,
    }));
  };

  // Handle marks change
  const handleMarksChange = (studentId, marksValue) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: marksValue,
    }));
  };

  // Handle task submission
  const submitTasks = () => {
    const taskData = students.map((student) => ({
      studentId: student.StudentId,
      studentName: student.StudentName,
      selectedTask: selectedTasks[student.StudentId] || null, // Use selected task ID
      marks: marks[student.StudentId] || null, // Marks entered by the teacher
    }));

    const payload = {
        teacherName : teacherName.FullName,
        teacherID : teacherName.id,
      session: session[sessionId]?.Session || "No session available",
      taskData,
    };
console.log("p",payload)
    // Send data to backend
    axios
      .post("http://localhost/backend/submit_task_marks.php", payload)
      .then((response) => {
        console.log("Task data submitted successfully:", response.data);
        alert("Task data submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting task data:", error);
        alert("Failed to submit task data.");
      });
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="p-5 bg-cyan-500">
      <h2 className="text-2xl font-bold mb-4">Tasks Panel</h2>

      {/* Task Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Student ID</th>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Select Task</th>
            <th className="border px-4 py-2">Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.StudentId}>
              <td className="border px-4 font-semibold py-2">{student.StudentId}</td>
              <td className="border px-4 font-semibold py-2">{student.StudentName}</td>
              <td className="border px-4 font-semibold py-2">
                <select
                  value={selectedTasks[student.StudentId] || ""}
                  onChange={(e) =>
                    handleTaskSelection(student.StudentId, e.target.value)
                  }
                  className="p-2 border font-semibold rounded w-full"
                >
                  <option value="">Select Task</option>
                  {tasks?.map((task) => (
                    <option key={task.taskId} value={task.taskId}>
                      {task.task_name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={marks[student.StudentId] || ""}
                  onChange={(e) =>
                    handleMarksChange(student.StudentId, e.target.value)
                  }
                  className="p-2 border rounded w-full"
                  placeholder="Enter marks"
                  min="0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Submit Button */}
      <button
        onClick={submitTasks}
        disabled={Object.keys(selectedTasks).length === 0}
        className="px-4 py-2 rounded bg-green-700 text-white mt-4"
      >
        Submit Tasks
      </button>
    </div>
  );
};

export default Tasks;

