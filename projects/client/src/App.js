import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/main component/Login";
import Register from "./components/main component/Register";
import HomePage from "./components/main component/HomePage";
import Navbar from "./components/main component/Navbar";
import FooterMobile from "./components/main component/FooterMobile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <FooterMobile />
    </Router>
  );
}

export default App;
