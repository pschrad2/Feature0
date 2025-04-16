import Parse from "parse";

// used in auth register component
export const createUser = async (newUser) => {
  const user = new Parse.User();
  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  try {
    const savedUser = await user.signUp();

    // Now we can safely assign the ACL with the user ID
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setWriteAccess(savedUser.id, true); // NOW we have a string ID!
    savedUser.setACL(acl);
    await savedUser.save(); // Save the ACL change

    return savedUser;
  } catch (error) {
    alert(`Error: ${error.message}`);
    return null;
  }
};


// used in auth login component
export const loginUser = (currUser) => {
  const user = new Parse.User();
// sign up is async... 
  user.set("password", currUser.password);
  user.set("username", currUser.email);
  user.set("email", "email@example.com");
  console.log("User: ", user);
  console.log();
  return user
    .logIn(user.email, user.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const checkUser = () => {
  return Parse.User.current()?.authenticated || false;
};