import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleCreateUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    // POST
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...users, data];
        setUsers(newUser);
        console.log(data);
      });
  };
  return (
    <div className="App">
      <h1>Available User: {users.length}</h1>
      <form onSubmit={handleCreateUser}>
        <input type="text" name="name" required placeholder="Name" /> <br />
        <input type="email" name="email" required placeholder="Email" /> <br />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} <br /> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
