import React, { useEffect, useState } from "react";
import axios from "axios";
import gridIcon from "../../img/grid.png"
import listIcon from "../../img/list.png"

export default function Users() {
  const [users, setUsers] = useState([]);
  const [grid, setGrid] = useState(true)

  const fetchUser = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/users/allUsers"
    );
    setUsers(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

const deleteUser=async(_id)=>{
  const { data } = await axios.delete(
    `http://localhost:5000/api/users/${_id}`
  );
  console.log(data)
  fetchUser();
}

  return (
    <div className="users">
      <div className="user-upper">
        <h3>User List</h3>
        <div className="icon-wrapper">
          <button onClick={() => setGrid(true)} className={grid ? "btn-active" : null}><img src={gridIcon} alt="grid" /></button>
          <button onClick={() => setGrid(false)} className={!grid ? "btn-active" : null}><img src={listIcon} alt="grid" /></button>
        </div>
      </div>
      {
        grid ? (
          <div className="user-grid">
            {users.map((user) => (
              <div className="user" key={user._id}>
                {user.userType === 'user' && <button onClick={()=>deleteUser(user._id)}><i className="fa-solid fa-xmark"></i></button>}
                <h3>{user.name}</h3>
                <a href={`mailto:${user.email}`} className="email">{user.email}</a>
                <p className="type">{user.userType}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="user-list">
            {
              users.map((user) => (
                <div className="user" key={user._id}>
                  {user.userType === 'user' && <i className="fa-solid fa-xmark" onClick={()=>deleteUser(user._id)}></i>}
                  <h3>{user.name}</h3>
                  <a href={`mailto:${user.email}`} className="email">{user.email}</a>
                  <p className="type">{user.userType}</p>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
}
