
import Parse from "parse";

///////////////////LearnServices.js file
export const getAllUsers = (myPost) => {
  const User = Parse.Object.extend("_User");
  const query = new Parse.Query(User);
  query.equalTo("post", myPost);
  return query.find().then((results) => {
    // returns array of Lesson objects
    return results;
  });
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

  query.equalTo('from_user', from_user);
  query.equalTo('to_user', to_user);

  try {
    const count = await query.count();
    return count > 0; // true if follow exists
  } catch (error) {
    console.error('Error checking follow relationship:', error);
    return false;
  }
};