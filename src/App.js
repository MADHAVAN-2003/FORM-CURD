import "./App.css";
import AddUser from "./Components/AddUser";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateUser from "./Components/UpdateUser";
import axios from "axios";

function App() {
  const baseURL = "http://localhost:8000/users";

  async function getuser() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={getuser} />} />
          <Route path="/add-user"  element={<AddUser />} />
          <Route path="/edit-user/:id" element={<UpdateUser user={getuser}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
