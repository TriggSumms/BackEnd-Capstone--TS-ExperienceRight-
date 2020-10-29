// import React from "react";
// import { Card } from "reactstrap";
// import { Link } from "react-router-dom";

// export default function User({ user }) {
//   return (
//     <section className="userCard">
//         <div className="user-container">
//             <div className="details-container">
//               <div className="userimg">
//               {
//                 user.profileImageLocation !== null ?
//                 <img src={user.profileImageLocation} alt={user.fullName}/> :
//                 <img src="https://robohash.org/numquamutut.png?size=150x150&set=set1" alt="DefaultImage"/>
//                 }
//             </div>
//             <div className="details">
//                 <Link style={{ textDecoration: 'none' }} to={`/users/${user.firebaseUserId}`}>
//                     <h2 className="displayName">{user.displayName}</h2>
//                 </Link>
//                 <strong>{user.fullName}</strong> 
//                 <br/>
//                 {user.userTypeId === 1
//                 ? <em className="admin">{user.userType.name}</em> :
//                 <em className="author">{user.userType.name}</em>}
//             </div>
//         </div>
//           <div className="status">
          
//             <div className="buttons">
 
//               <Link style={{ textDecoration: 'none' }} to={`/users/edit/${user.id}`}>
//                   <button className="std-btn">Edit User</button>
//               </Link>
//             </div> 

//           </div>
//       </div>
//     </section>
//   );
// }
