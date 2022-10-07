import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/admin'>
        <Route path='login' element={<LandingPage />} />
      </Route>
      <Route path='/insturctor'>
        <Route path='login' element={<LandingPage />} />
      </Route>
      <Route path='/student'>
        <Route path='login' element={<LandingPage />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
