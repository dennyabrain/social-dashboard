const { getUserByName } = require("./controller-mentions");
const { writeFile } = require("fs/promises");

/**
 * A lot of twitter API will require you to pass a user's ID. Most people refer to twitter users via their username
 * This function lets you supply a list of handles in the USER_HANDLES variable.
 * When done, this script will store the user ID, handle and username in a file success.json. All failures will be
 * recorded in a corresponding failure.json
 */
async function getUserIdsByHandle() {
  let success = [];
  let failure = [];
  const USER_HANDLES = [{ handle: "" }];
  for (let i = 0; i < user_handles.length; i++) {
    try {
      const user = await getUserByName(user_handles[i].handle);
      console.log(user);
      success.push(user);
    } catch (err) {
      console.log("Error Getting User", err);
      failure.push(err);
    }
  }
  await writeFile("success.json", JSON.stringify(success));
  await writeFile("failure.json", JSON.stringify(failure));
}

module.exports = {
  getUserIdsByHandle,
};
