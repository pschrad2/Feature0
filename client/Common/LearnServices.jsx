
import Parse from "parse";

///////////////////LearnServices.js file
/*export const getAllUsers = (myPost) => {
  const User = Parse.Object.extend("_User");
  const query = new Parse.Query(User);
  console.log("query in LearnServices",query);
  //query.equalTo("post", myPost);
  return query.find().then((results) => {
    // returns array of Lesson objects
    return results;
  });
};
*/


export const getAllUsers = async () => {
  try {
    const query = new Parse.Query(Parse.User);
    query.limit(1000); // optional: increase limit (default is 100)
    const users = await query.find();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const createFollow = (from_user, to_user) => {

    const Follow = Parse.Object.extend('Follow');
    const followActivity = new Follow();
  
    followActivity.set('from_user', from_user);
    followActivity.set('to_user', to_user);
    followActivity.set('date_created', new Date());
  
    followActivity.save()
      .then(() => {
        console.log('Follow activity saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving follow activity:', error);
      });
  };
  
export const checkFollow = async(from_user, to_user) => {
  const Follow = Parse.Object.extend('Follow');
  const query = new Parse.Query(Follow);
  console.log("currentuser and another selected user", from_user.id, to_user.id)
  query.equalTo('from_user', from_user);
  query.equalTo('to_user', to_user);
  //console.log(query);
  try {
    const count = await query.count();
    console.log(count);
    return count > 0; // true if follow exists
  } catch (error) {
    console.error('Error checking follow relationship:', error);
    return false;
  }
};