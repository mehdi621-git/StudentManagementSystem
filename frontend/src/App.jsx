import Admin from "./mainComponents/admin";
import AttendenceI from "./mainComponents/AttendenceI";
import FeeI from "./mainComponents/FeeI";
import Layout from "./mainComponents/Layout";
import DistributionCharts from "./mainComponents/StudentI";
import TeacherPanel from "./mainComponents/TeacherPanel";
import Linker from "./ReuseableComponents/Linker";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Table from "./ReuseableComponents/Table";
import AssignSem from "./Finals/AssignSem";
import EditTeacher from "./Finals/editTeacher";
import DeeleteTeacher from "./Finals/DeeleteTeacher";
import AdminStudent from "./AStudent.jsx/Home";
import MarkFee from "./ReuseableComponents/MarkFee";
import Sidebar from "./teacher/LayoutT";
import SessionPanel from "./teacher/Block";
import LayoutT from "./teacher/LayoutT";
import Dashboard from "./teacher/overallScore";
import Attendence from "./teacher/attendence";
import Assignments from "./teacher/Assignments";
import Profile from "./teacher/Profile";
import Student from "./student/Student";
import LayoutS from "./student/Layout";
import StudentDashboard from "./student/Dashboard";
import Tasks from "./teacher/Tasks";
import AddTask from "./teacher/Assignments";
import AssignmentsTable from "./student/Assignments";
import Attendance from "./student/Attendence";
import StudentProfile from "./student/Profile";
import MonthlyAttendance from "./ReuseableComponents/AttendenceChart";
import Fee from "./ReuseableComponents/Charts";
import LoginPage from "./Authentication/Login";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import IntroPage from "./Authentication/Intro";

const App = () => {
    const { state, setstate } = useContext(Context);
    const [role, setRole] = useState(localStorage.getItem('role')); // Read the role from localStorage

    useEffect(() => {
        // If role is updated in context or localStorage, update it
        setRole(localStorage.getItem('role'));
    }, [state]);

  

    return (
        <>
        <Routes>

            {/* Login route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Routes accessible for Admin */}
            {role === 'admin' && (
                <Route path="/" element={<Layout />}>
                    <Route index element={<Admin />} />
                    <Route path="admin" element={<Admin />}>
                        <Route path="fee" element={<Fee />} />
                        <Route path="attendence" element={<MonthlyAttendance />} />
                        <Route path="student" element={<DistributionCharts />} />
                        <Route path="feedback" element={<AttendenceI />} />
                    </Route>
                    <Route path="/teacherPanel" element={<TeacherPanel />}>
                        <Route index element={<Table />} />
                        <Route path="home" element={<Table />} />
                        <Route path="assign" element={<AssignSem />} />
                        <Route path="edit" element={<EditTeacher />} />
                        <Route path="delete" element={<DeeleteTeacher />} />
                    </Route>
                    <Route path="/student" element={<AdminStudent />}>
                        <Route path="edit" element={<EditTeacher std="student" />} />
                        <Route index element={<Table std="student" />} />
                        <Route path="delete" element={<DeeleteTeacher std="student" />} />
                        <Route path="markFee" element={<MarkFee />} />
                        <Route path="home" element={<Table std="student" />} />
                    </Route>
                </Route>
            )}

            {/* Routes accessible for Teacher */}
            {role === 'teacher' && (
                <Route path="/t" element={<LayoutT />}>
                    <Route index element={<Dashboard />} />
                    <Route path="home" element={<SessionPanel />} />
                    <Route path="overview" element={<Dashboard />} />
                    <Route path="attendence" element={<Attendence />} />
                    <Route path="assignments" element={<AddTask />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            )}

            {/* Routes accessible for Student */}
            {role === 'student' && (
                <Route path="/s" element={<LayoutS />}>
                    <Route index element={<StudentDashboard />} />
                    <Route path="assignment" element={<AssignmentsTable />} />
                    <Route path="attendence" element={<Attendance />} />
                    <Route path="profile" element={<StudentProfile />} />
                </Route>
            )}

            {/* Default route redirect to login if not logged in */}
 <Route path="*" element={<IntroPage />} />
        </Routes>
    </>
  );
};

export default App;
