// IMPORTS
// using the mongoose library, pulling in the Schema constructor and the model function
const { Schema, model } = require("mongoose");
// pulling in the reaction schema
const reactionSchema = require("./Reaction");
// the date formatter helper from the utils folder
const dateFormat = require("../utils/dateFormat");

// New schema to manage thoughts
const thoughtSchema = new Schema(
    {
        // Body of the text for a thought message
        thoughtText: {
            type: String,
            required: "You must type a thought",
            minlength: 1,
            maxlength: 280,
        },
        // Stores the timestamp when the thought is created
        createdAt: {
            type: Date,
            // Function sets date/time to be now
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp), // Using the date formmater helper
        },
        // Stores the user associated with this thought
        username: {
            type: String,
            required: true,
        },
        // Array to manage the reactions associated with this thought
        reactions: [reactionSchema],
    },
    {
        // getter applied when converting the document to JSON format
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
// This is to count the amount of reactions per thought. The virtual calculates it. By accessing the reactions array and returning it's length.
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

// Using model to call on the thoughtSchema
const Thought = model("Thought", thoughtSchema);

// EXPORT
module.exports = Thought;