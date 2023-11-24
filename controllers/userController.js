// IMPORT to pull in the User and Tought models
const { User, Thought } = require("../models");

// This variable manages all of the needed user controllers to be used by the routes
const userController = {
    // GET all users
    getUsers(req, res) {
        User.find()
        // the __v option specifies the version field, it represents the MongoDB document's version should be excluded from the retrieved data.
        .select("-__v")
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // GET an individual user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user with this ID" });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // POST a new user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // PUT to find and update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            // Using the userId to identify the record
            { _id: req.params.userId },
            // update the user's data with the data in the request body using set operator
            { $set: req.body, },
            {
                // ensures the data adheres to validation rules
                runValidators: true,
                new: true,
            }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user with this ID" });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // DELETE user by ID
    deleteUser(req, res) {
        // finds one user by ID and deletes
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user with this ID" });
            }
            // BONUS to delete all of users thoughts along with the user
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts }});
        })
        .then(() => {
            res.json({ message: "The user and their thoughts are deleted"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // PUT update the user to add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            // user found by the userId
            { _id: req.params.userId },
            // Update the friends array using the friendId. addToSet operator ensures that duplicate friend IDs are not added.
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user with this ID" });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // PUT update user to remove a friend
    removeFriend(req, res) {
        // same as above
        User.findOneAndUpdate(
            { _id: req.params.userId },
            // the pull operator ensures that the specified friend ID is removed from the array
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user with this ID" });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userController;