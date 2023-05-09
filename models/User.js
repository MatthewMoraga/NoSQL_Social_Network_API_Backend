// importing mongoose
const { Schema, model, Types } = require("mongoose");

// setting up schema according to the readme specs
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        // using a regular expression as the validator to test if the strings match an email
        // the grouping construct is using a bracket expression to check for all letters with both cases and special characters.
        // and any digits 0-9 grouped by ([string])@([string]).([string]).com
        // and using a + quantifier to see if the string should be matched one or more times.
        // and the third grouping construct is using bracket expression to check all letters for both cases
        // with curly brackets quantifier to match the characters in a string up to 2-5 times.
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+).([a-zA-Z{2,5}])$/.test(v);
                }
            }
        },
        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
    },
    {
        // the toJSON option allows virtual properties to be displayed when a user document is in json format
        // id: false disables the "_id" field in the User model to be returned when returning the json method
        toJSON: {
            virtuals: true,
        },
            id: false,
    }
);

// setting up the virtual property for "friendcount" which will retrieve the length of the friends array
userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;