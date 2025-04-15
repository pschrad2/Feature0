import React, { useEffect, useState } from "react";
import Parse from "parse";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const query = new Parse.Query(Parse.User);
      try {
        const userObj = await query.get(userId);
        setUser(userObj);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>{user.get("firstName")} {user.get("lastName")}</h2>
      <p>Username: {user.get("username")}</p>
      <p>Email: {user.get("email")}</p>
      <p>Joined on: {user.createdAt?.toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;
