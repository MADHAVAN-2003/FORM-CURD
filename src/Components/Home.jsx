import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function Home(params) {
  const [data, setData] = useState([]);
  const { user } = params;
  const baseURL = "http://localhost:8000/users";
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userData = await user();
      setData(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  function handleUpdate(id) {
    navigate(`/edit-user/${id}`);
  }

  function handleDelete(id){
    axios.delete(`${baseURL}/${id}`)
    fetchData()
  }

  //getUser()
  return (
    <div>
      <h1>User Data</h1>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eachUser, index) => (
            <tr key={eachUser.id}>
              <td>{index + 1}</td>
              <td>{eachUser.name}</td>
              <td>{eachUser.email}</td>
              <td>{eachUser.phone}</td>
              <td>
                <Link to="/"><button onClick={() => handleUpdate(eachUser.id)}>Edit</button></Link>
                <button onClick={()=> handleDelete(eachUser.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-user"><button>Add User</button></Link>
    </div>
  );
}

export default Home;
