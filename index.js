require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const User = mongoose.model("User", {
    first_name: String,
    last_name: String,
    age: Number,
    email: String
});

// const newUser = new User({
//     first_name: "Dimos",
//     last_name: "Karadimos",
//     email: "sitenet@gmail.com",
//     age: 15
// });
// newUser.save();


User
    .find({
        first_name: "Dimos",
        age: {$gt: 50} // age > 50
    })
    .sort({age: -1})
    .select({
        _id: 0,
        first_name: 1,
        last_name: 1
    })
    .then(users => {
        console.log(users);
    });
