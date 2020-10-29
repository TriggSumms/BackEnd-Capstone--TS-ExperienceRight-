// import React, { useState, useEffect, useContext } from "react";
// import { UserProfileContext } from "../../providers/UserProfileProvider";
// import { useHistory, useParams, Link } from "react-router-dom";

// const UserEdit = () => {
//     const history = useHistory();
//     const [user, setUser] = useState();
//     const [userTypeId, setUserTypeId] = useState();
//     const { updateUser, getUserId, userTypes, getAllUserTypes } = useContext(UserProfileContext);
//     const { id } = useParams();

//     const editUser = (e) => {
//         e.preventDefault();
//         const parsedUserType = parseInt(userTypeId)
//         user.userTypeId = parsedUserType;
//         updateUser(user)
//             .then(() => history.push("/users"));
//     }

//     const handleChange = (e) => {
//         setUserTypeId(e.target.value);
//     }

//     useEffect(() => {
//         getUserId(id)
//             .then((users) => {
//                 getAllUserTypes()
//                 setUser(users)
//             })
//     }, []);

//     if (!user) {
//         return null;
//     }

//     return (
//         <>
//             <main className="editUsersContainer">
//                 <section className="users-table">
//                     <h1>Change User Type</h1>

//                     <h4>Select a user type for {user.fullName}</h4>
//                     <hr />

//                     <select className="userEditDropdown" onChange={handleChange}>
//                         {userTypes.map(userType =>
//                             user.userTypeId === userType.id ?
//                                 <option selected value={userType.id}>
//                                     {userType.name}
//                                 </option> :
//                                 <option value={userType.id}>
//                                     {userType.name}
//                                 </option>
//                         )}
//                     </select>
//                     <div className="row">
//                         <div className="actionBtns">
//                             <div className="form-group">
//                                 <input type="submit" onClick={editUser} value="Confirm" className="btn-red" />&nbsp;&nbsp;|&nbsp;&nbsp;
//                             <Link to="/users">
//                                     Cancel
//                             </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </>
//     );
// }

// export default UserEdit;