import { Route, Routes, Link } from "react-router-dom";
import Guestbook from "./Pages/Guestbook";
import Home from "./Pages/Home";
export default function App() {
  return (
    <div>
      <nav className="navBar">
        <h2>Welcome to the home page</h2>
        <Link to="/">Home</Link>
        <Link to="/reviews">Previous Reviews</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reviews" element={<Guestbook />}></Route>
      </Routes>
    </div>
  );
}
