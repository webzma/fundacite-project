import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/home";
import Teachers from "./pages/teachers/teachers";
import Course from "./pages/course/course";
import Courses from "./pages/courses/courses";

const AppRoutes = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/courses/1" element={<Course />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/courses" element={<Courses />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
