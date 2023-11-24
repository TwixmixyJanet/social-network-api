// IMPORTS
// initializing the express router object
const router = require('express').Router();
// connection to all the thought and reaction functions in the thought controller
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// This route manages the GET and POST for retrieving all the thoughts and posting a new thought
router.route('/').get(getThoughts).post(createThought);

// This route manages the GET, PUT, and DELETE for getting a single thought, updating a thought, and deleting a thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// This route manages the POST for updating a thought and adding a reaction to it
router.route('/:thoughtId/reactions').post(addReaction);

// This route manages the DELETE for updating a thought and removing a reaction to it
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// EXPORT
module.exports = router;