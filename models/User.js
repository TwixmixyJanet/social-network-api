// IMPORTS
// using the mongoose library, pulling in the Schema constructor and the model function
const { Schema, model } = require('mongoose');

// New schema to manage users
const UserSchema = new Schema(
    {
        // Stores the user name
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        // Stores the user email
        email: {
            type: String,
            required: true,
            unique: true,
            // Special mongoose regex matching for email
            match: [/.+\@.+\..+/, "Must match an email address format."]
        },
        // Stores the array of thoughts
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref:  "Thought",
            }
        ],
        // Stores the array of friends
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    {
        // getter applied when converting the document to JSON format
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// This is to count the amount of friends per user. The virtual calculates it. By accessing the friends array and returning it's length.
UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

// Using model to call on the userSchema
const User = model("User", UserSchema);

// EXPORT
module.exports = User;