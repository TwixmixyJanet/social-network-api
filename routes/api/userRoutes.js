// IMPORTS
// initializing the express router object
const router = require('express').Router();
// connection to all the user and friend functions in the user controller
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// This route manages the GET and POST for retrieving all the users and posting a new user
router.route('/').get(getUsers).post(createUser);

// This route manages the GET, PUT, and DELETE for getting a single user, updating a user, and deleting a user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// This route manages the POST and DELETE for adding and removing a user(friend) to a user
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// EXPORT
module.exports = router;