//  importing packages and files
const { Schema, Types } = require("mongoose");

// setting up the reaction model according to readme specs

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestap =>  new Date(timestamp).toLocaleDateString()
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

// exporting the Schema only according to readme specs
module.exports = reactionSchema