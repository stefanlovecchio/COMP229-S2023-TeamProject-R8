<<<<<<< Updated upstream
//require modules for the User Module
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username: 
        {
            type: String,
            default: "",
            trim: true,
            required: "username is required"
        },
        /*
        password:
        {
            type: String,
            defaule: "",
            required: "password is required"
        }
        */
       email_address:
       {
            type: String,
            default: "",
            trim: true,
            required: "email address is required"
       },
       displayName:
       {
        type: String,
        default: "",
        trim: true,
        required: "Display Name is required"
       },
       created:
       {
        type: Date,
        default: Date.now
       },
       updated:
       {
        type: Date,
        default: Date.now
       },

    },
    {
        collection: "users"
    }
);

//configure options for User Model
let options = ({missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);

=======
let mongoose = require ('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
{
    username:
    {
        type:String,
        default:"",
        trim:true,
        require:"Username is required."
    },
    email:
    {
        type:String,
        default:"",
        trim:true,
        require:"Email address is required."
    },
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        require:"Display name is required."
    }
},
{
    collection:'users'
}
)
//configure option for user model
let options = ({missingPasswordError:"Wring / Missing Password "});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User',User);
>>>>>>> Stashed changes
