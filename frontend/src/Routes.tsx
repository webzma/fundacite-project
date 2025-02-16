import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import CourseDetails from "./components/CourseDetails";
import Home from "./pages/home/home";
import Teachers from "./pages/teachers/teachers";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/courses/1" element={<CourseDetails />} />
          <Route path="/teachers" element={<Teachers />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
