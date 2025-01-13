import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
