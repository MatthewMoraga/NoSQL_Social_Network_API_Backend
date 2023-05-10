// importing packages and files
const { Schema, model } = require("mongoose");

// importing the reaction schema
const reactionSchema = require("./Reaction");

// setting up the thoughtSchema according to readme specs
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        ceatedAt:{
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username:{
            type: String,
            required: true,
        },
        reactions:[reactionSchema],
    },
    {
        toJSON:{
            getters: true,
            virtuals: true,
        },
        id: false, 
    }
);

// setting up the virtual method for "reactionCount" which will retrieve the length of the friends array
thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

// setting up the Thought model to be used with the Thought collection for exports
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;