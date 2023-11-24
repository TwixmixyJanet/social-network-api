// IMPORTS 
// the mongoose Schema constructor and Types object
const { Schema, Types } = require("mongoose");
// the date formatter helper from the utils folder
const dateFormat = require("../utils/dateFormat");

// New schema to manage reactions
const reactionSchema = new Schema(
    {
        // ID for the reaction
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },
        // Text message for the reaction
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // User associated with the reaction
        username: {
                type: String,
                required: true,
        },
        // Date/Time created
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp), // Uses the data format helper
        },
    },
    { 
        // option instructs Mongoose to include virtual getters when converting the document to JSON format.
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// EXPORT
module.exports = reactionSchema;