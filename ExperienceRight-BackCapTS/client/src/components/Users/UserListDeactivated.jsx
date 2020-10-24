// import React, { useContext, useEffect } from "react";
// import User from "./User";
// import { Link } from "react-router-dom";
// import { UserProfileContext } from "../../providers/UserProfileProvider";

// export default function UserListDeactivated() {
//   const { users, getAllInactiveUsers } = useContext(UserProfileContext);

//   useEffect(() => {
//     getAllInactiveUsers();
//   }, []);

//   return (
//     <section>
//       <div className="usersContainer">
//         <div className="users-header">
//           <div className="userTitle">
//             <h2>Deactivated Users</h2>
//           </div>
//           <div className="status-button">
//             <div className="viewBtn">
//               <Link style={{ textDecoration: 'none' }} to="/users">
//                   <button className="view">View All Active</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {users.map(u =>
//         <User key={u.id} user={u}/>
//       )}
//     </section>
//   );
// }