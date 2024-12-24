import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../context";

const AddTask = () => {
    const {session} = useContext(Context)
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [teacherName, setTeacherName] = useState("John Doe"); // Replace with dynamic teacher name
  const [selectedSession, setSelectedSession] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const teacher_id =16;
  // Handle form inputs  useEffect(() => {
    useEffect(() => {
        const fetchTeacherData = async () => {
          try {
            const response = await axios.get(
              `http://localhost/backend/getteacherData.php?teacher_id=${teacher_id}`
            );
            if (response.data.error) {
              setError(response.data.error);
            } else {
                console.log(response.data)
              setTeacherName(response.data[0].FullName);
            }
          } catch (err) {
            setError('Failed to fetch teacher data');
          } finally {
            setLoading(false);
          }
        };
    
        fetchTeacherData();
      }, [teacher_id]);
  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleDeadlineChange = (e) => setDeadline(e.target.value);
  const handleSessionChange = (e) => setSelectedSession(e.target.value);

  const generateTaskId = () => {
    // Generate a unique task ID based on the current timestamp
    return `task-${Date.now()}`;
  };

  // Submit the new task
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !deadline || !selectedSession) {
      setError("Please fill all fields.");
      return;
    }

    const newTask = {
      taskId: generateTaskId(),
      taskName,
      deadline,
      teacherName,
      session: selectedSession,
    };
console.log(newTask)
    setLoading(true);
    setError(""); // Reset error before submission

    try {
      const response = await axios.post("http://localhost/backend/save_marks.php", newTask);
      if (response.data.status === "success") {
        alert("Task added successfully!");
        setTaskName("");
        setDeadline("");
        setSelectedSession(""); // Reset selected session
      } else {
        setError("Failed to add task.");
      }
    } catch (err) {
      console.error("Error submitting task:", err);
      setError("An error occurred while adding the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-slate-300 p-5">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={handleTaskNameChange}
            className="p-2 border rounded w-full"
            placeholder="Enter task name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={handleDeadlineChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Select Session</label>
          <select
            value={selectedSession}
            onChange={handleSessionChange}
            className="p-2 border rounded w-full"
          >
            <option value="">Select a session</option>
            {session?.map((session, index) => (
              <option key={index} value={session.Session}>
                {session.Session} - {session.Department || "No Department"}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 text-white mt-4"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;


  
  
