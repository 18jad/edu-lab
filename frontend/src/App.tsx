import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute";
import AdminCourses from "./pages/AdminCourses";
import AdminDashboard from "./pages/AdminDashboard";
import AdminInstructor from "./pages/AdminInstructor";
import AdminLogin from "./pages/AdminLogin";
import AdminStudents from "./pages/AdminStudents";
import InstructorAnnouncements from "./pages/InstructorAnnouncements";
import InstructorAssignments from "./pages/InstructorAssignments";
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorLogin from "./pages/InstructorLogin";
import InstructorStudents from "./pages/InstructorStudents";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import StudentAssignments from "./pages/StudentAssignments";
import StudentCourses from "./pages/StudentCourses";
import StudentDashboard from "./pages/StudentDashboard";
import StudentLogin from "./pages/StudentLogin";

const App = () => {
  const adminCheck = localStorage.getItem("admin_access_token") === null;
  const instructorCheck =
    localStorage.getItem("instructor_access_token") === null;
  const studentCheck = localStorage.getItem("student_access_token") === null;

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/admin'>
        <Route
          path='login'
          element={
            <ProtectedRoute
              user={adminCheck}
              redirect='../dashboard'
              access={<AdminLogin />}
            />
          }></Route>
        <Route
          path='dashboard'
          element={
            <ProtectedRoute
              user={!adminCheck}
              redirect='../login'
              access={<AdminDashboard />}
            />
          }></Route>
        <Route
          path='dashboard/students'
          element={
            <ProtectedRoute
              user={!adminCheck}
              redirect='../login'
              access={<AdminStudents />}
            />
          }></Route>
        <Route
          path='dashboard/instructors'
          element={
            <ProtectedRoute
              user={!adminCheck}
              redirect='../login'
              access={<AdminInstructor />}
            />
          }></Route>
        <Route
          path='dashboard/courses'
          element={
            <ProtectedRoute
              user={!adminCheck}
              redirect='../login'
              access={<AdminCourses />}
            />
          }></Route>
      </Route>
      <Route path='/instructor'>
        <Route
          path='login'
          element={
            <ProtectedRoute
              user={instructorCheck}
              redirect='../dashboard'
              access={<InstructorLogin />}
            />
          }></Route>
        <Route
          path='dashboard'
          element={
            <ProtectedRoute
              user={!instructorCheck}
              redirect='../login'
              access={<InstructorDashboard />}
            />
          }></Route>
        <Route
          path='dashboard/students'
          element={
            <ProtectedRoute
              user={!instructorCheck}
              redirect='../login'
              access={<InstructorStudents />}
            />
          }></Route>
        <Route
          path='dashboard/assignments'
          element={
            <ProtectedRoute
              user={!instructorCheck}
              redirect='../login'
              access={<InstructorAssignments />}
            />
          }></Route>
        <Route
          path='dashboard/announcements'
          element={
            <ProtectedRoute
              user={!instructorCheck}
              redirect='../login'
              access={<InstructorAnnouncements />}
            />
          }></Route>
      </Route>
      <Route path='/student'>
        <Route
          path='login'
          element={
            <ProtectedRoute
              user={studentCheck}
              redirect='../dashboard'
              access={<StudentLogin />}
            />
          }></Route>
        <Route
          path='dashboard'
          element={
            <ProtectedRoute
              user={!studentCheck}
              redirect='../login'
              access={<StudentDashboard />}
            />
          }></Route>
        <Route
          path='dashboard/assignments'
          element={
            <ProtectedRoute
              user={!studentCheck}
              redirect='../login'
              access={<StudentAssignments />}
            />
          }></Route>
        <Route
          path='dashboard/courses'
          element={
            <ProtectedRoute
              user={!studentCheck}
              redirect='../login'
              access={<StudentCourses />}
            />
          }></Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
