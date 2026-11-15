import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Person from "./components/person/Person";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="person" element={<Person />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
