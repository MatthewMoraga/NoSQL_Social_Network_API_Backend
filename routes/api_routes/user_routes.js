// import packages and files
const router = require("express").Router()

// importing the user controller and the handler methods
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require("../../controllers/user-control");

// get and post routes for all users the mongo way
router.route("/").get(getAllUsers).post(createUser);

// get and put user id, delete user by id
router.route("/:userId").get(getUserById).put(updateUserById).delete(deleteUserById);

// post to add friends and delete to remove bad friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;