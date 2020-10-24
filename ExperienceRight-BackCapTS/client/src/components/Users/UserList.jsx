// import React, { useContext, useEffect } from "react";
// import User from "./User";
// import { Link } from "react-router-dom";
// import { UserProfileContext } from "../../providers/UserProfileProvider";

// export default function UserList() {
//   const { users, getAllUsers } = useContext(UserProfileContext);

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   return (
//     <section>
//       <div className="usersContainer">
//         <div className="users-header">
//           <div className="userTitle">
//             <h2>Active Users</h2>
//           </div>
//           <div className="status-button">
//             <div className="viewBtn">
//               <Link style={{ textDecoration: 'none' }} to="/inactive">
//                   <button className="view">View Deactivated</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {users.map(u =>
//           <User key={u.id} user={u}/>
//       )}
//     </section>
//   );
// }