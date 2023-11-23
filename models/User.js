const mongoose = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@+\..+/, "Must match an email address format."]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref:  "Thought"
            }
        ]
    }
)