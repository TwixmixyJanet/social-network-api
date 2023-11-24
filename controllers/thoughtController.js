// IMPORT to pull in the Thought and User models
const { Thought, User } = require("../models");

// This variable manages all of the needed thought controllers to be used by the routes
const thoughtController = {
    // GET all thoughts to retrieve them from the database and send them back as JSON data to the client.
    getThoughts(req, res) {
        // Retrieve all thoughts from database
        Thought.find()
        // Used to sort the thoughts by the createdAt timestamp in descending order, so the most recent thoughts display first
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // GET a thought by ID
    getSingleThought(req, res) {
        // If the thought is found, the data is returned and sent back to the client as JSON data. If not, it returns an error message.
        Thought.findOne({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this ID"});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // POST a new thought and update it to the associated user profile
    createThought(req, res) {
        // This simplified syntax manages the thought creation process
        Thought.create(req.body)
        // Update the data to the associated user, pushing the new thought. 
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "Thought created but could not find user ID"});
            }
            res.json({ message: "Thought created"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // PUT update a thought
    updateThought(req, res) {
        // find the existing thought via ID and update it using the set property
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            // ensures that the updated thought data adheres to the defined validation rules
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this ID"});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // DELETE thought by ID
    deleteThought(req, res) {
        // Based off of the ID the function finds and deletes the associated thought
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this ID"});
            }

            // BONUS remove thought from user
            // Updates the user to no longer have the deleted thought associated
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "Thought deleted but could not find user ID"});
            }
            res.json({ message: "Thought is deleted"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // POST reaction by updating thought through ID
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            // finding and updating the thought by ID
            { _id: req.params.thoughtId },
            // adds the reaction data to the array using addToSet, ensuring duplicates are not added.
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this ID"});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // DELETE reaction by updating thought through ID
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            // same as add
            { _id: req.params.thoughtId },
            // removed the reaction with the matching reaction ID from the array using pull. This ensures only the specified reaction is removed.
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this ID"});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = thoughtController;