import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import toast from "react-hot-toast";

export default function Users() {
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!usersLoaded) {
      const token = localStorage.getItem("authToken");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/all", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUsers(response.data.userList);
          setUsersLoaded(true);
        });
    }
  }, [usersLoaded]);

  function updateUser(email, status) {
    const token = localStorage.getItem("authToken");
    axios.put(
      import.meta.env.VITE_BACKEND_URL + "/api/user",
      {
        email: email,
        isDisabled: status,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((response)=>{
        toast.success('"User Update Succssfully"');
        setUsersLoaded(false);
    })
  }

  return (
    <div className="w-full h-full p-2">
      {usersLoaded ? (
        <div className="w-full h-full overflow-y-scroll">
          <table id="user-tbl" className="w-full">
            <thead id="user-tbl-head">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Email Verified</th>
                <th>Phone Number</th>
                <th>User role</th>
                <th>User Status</th>
              </tr>
            </thead>
            <tbody id="user-tbl-body">
              {users.map((user, index) => {
                const userStatus = user.isDisabled ? "Active" : "Disabled";
                return (
                  <tr key={index}>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isEmailVerified ? "Verified" : "Not Verified"}
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    {/* <td>{(user.isDisabled) ? "Active" : "Disabled"}</td> */}
                    <td>
                      <select
                        onChange={(evt) => {
                          updateUser(user.email, evt.target.value);
                        }}
                        value={user.isDisabled}
                      >
                        <option value="false">Active</option>
                        <option value="true">Disabled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
