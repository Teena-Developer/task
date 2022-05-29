import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addproduct from "./components/pages/addproduct";
import Editproduct from "./components/pages/editproduct";
import Home from "./components/pages/home";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/addproduct" element={<Addproduct />} />
        <Route exact path="/editproduct" element={<Editproduct />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);