// importing packages and files
const { User } = require("../models");

// mongo db is great for easier creation of databases but it can get messy quickly
// which is why setting up a control object with the Collection Schemas 
// and attaching methods to them can help organize 
// when and where the methods are applied rather than just calling them in routes.

// getting all users passing an empty query which will check for all documents in
// the User collection 
const UserControl = {
    getAllUsers(req, res) {
        User.find({})
        .then(UserData => res.json(UserData))
        .catch(err => res.status(500).json(err));
    },
    // getting on user by their id
    getUserById(req, res) {
        User.findById(req.params.userId)
    },
    // creating a user
    createUser(req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },
    // update a user by their id
    updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: "no user found"});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },
    // delete user by their id
    deleteUserById(req, res) {
        User.findOneAndDelete(req.params.id)
        .then(userData => {
            if(!userData) {
                return res.status(404).json({ message: "no user found" });
            }
            res.json({ message: "User deleted successfully" });
        })
        .catch(err => res.status(500).json(err));
    },
    // add friends to a user's friend list using the $addToSet operator
    // to add the friendId from either the request body or the request parameters
    // to the "friends" array in the document while ensuring each item in the array is unique
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addToSet: { friends: req.body.friendId || req.params. friendId } },
            { new: true}
        )
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },
    // remove a friend form the user's friend list
    // using the $pull operator here to remove an item from the friends array
    // in the document which is specified by the friendId parameter
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "no user with id found" });
            }
            const friendRemoved = !dbUserData.friends.includes(params.friendId);
            if (friendRemoved) {
                res.json({ message: "bad friend gone", dbUserData });
            } else {
                res.json(dbUserData);
            }
        })
        .catch((err) => res.status(400).json(err));
    },
};


// exporting the user control with its User methods
module.exports = UserControl;