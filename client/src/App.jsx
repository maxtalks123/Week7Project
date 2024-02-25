import { Route, Routes, Link } from "react-router-dom";
import Guestbook from "./Pages/Guestbook";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
export default function App() {
  return (
    <div>
      <nav className="navBar">
        <h2>Welcome to the home page</h2>
        <Link to="/">Home</Link>
        <Link to="/reviews">Previous Reviews</Link>
        <Link to="/categories">Categories</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reviews" element={<Guestbook />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
      </Routes>
    </div>
  );
}
