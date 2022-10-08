import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute";
import AdminCourses from "./pages/AdminCourses";
import AdminDashboard from "./pages/AdminDashboard";
import AdminInstructor from "./pages/AdminInstructor";
import AdminLogin from "./pages/AdminLogin";
import AdminStudents from "./pages/AdminStudents";
import InstructorLogin from "./pages/InstructorLogin";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import StudentLogin from "./pages/StudentLogin";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/admin'>
        <Route path='login' element={<AdminLogin />} />
        <Route
          path='dashboard'
          element={
            <ProtectedRoute
              user={true}
              redirect='../login'
              access={<AdminDashboard />}
            />
          }></Route>
        <Route
          path='dashboard/students'
          element={
            <ProtectedRoute
              user={true}
              redirect='../login'
              access={<AdminStudents />}
            />
          }></Route>
        <Route
          path='dashboard/instructors'
          element={
            <ProtectedRoute
              user={true}
              redirect='../login'
              access={<AdminInstructor />}
            />
          }></Route>
        <Route
          path='dashboard/courses'
          element={
            <ProtectedRoute
              user={true}
              redirect='../login'
              access={<AdminCourses />}
            />
          }></Route>
      </Route>
      <Route path='/instructor'>
        <Route path='login' element={<InstructorLogin />} />
      </Route>
      <Route path='/student'>
        <Route path='login' element={<StudentLogin />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
