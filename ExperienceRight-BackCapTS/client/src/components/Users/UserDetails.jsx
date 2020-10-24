import React, { useEffect, useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, Link } from "react-router-dom";
 
const UserDetails = () => {
  const [ user, setUser ] = useState();
  const { getUserProfile } = useContext(UserProfileContext);
  const { id } = useParams();

  useEffect(() => {
    getUserProfile(id).then(setUser);
  }, []);

  if (!user) {
    return null;
  }

  console.log(user)
  return (
    <>
      <div className="usersContainer">
        <div className="userDetailCard">
          <div className="userDetailHeader">
            <div className="userDetailImg">
              <h2>{user.fullName}</h2>
              {
              user.profileImageLocation !== null ?
              <img src={user.profileImageLocation} alt={user.fullName}/> :
              <img src="https://robohash.org/numquamutut.png?size=150x150&set=set1" alt="DefaultImage"/>
              }
            </div>
            <div className="userDetailInfo">
              <p><strong>Display Name:</strong> {user.displayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User Since:</strong> {new Intl.DateTimeFormat('en-US').format(new Date(user.createDateTime))}</p>
              <p><strong>User Type:</strong> {user.userType.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="backBtn">
        <div className="actualBackBtn">
          <Link to="/users">Back to List</Link>
        </div>
      </div>
    </>
  );
};

export default UserDetails;