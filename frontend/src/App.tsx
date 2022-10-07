import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
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
      </Route>
      <Route path='/insturctor'>
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
