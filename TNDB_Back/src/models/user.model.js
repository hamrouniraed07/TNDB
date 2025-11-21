import mongoose from "mongoose";
import { hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.ObjectId,
        firstName: String,
        lastName: String,
        nickName: String,
        coverPicture: String,
        profilePicture: String,
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        watchList: [
            {
                _id: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Movie",
                },
                isFavourite: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        role: String,
        token: String,
        createdAt: Date,
    },
    { collection: "users", versionKey: false, _id: false }
);

// userSchema.statics.findByCreds = async (email, pass) => {
//     const user = await User.findOne({ email })

//     if (!user) {
//         throw Error("wrong email")
//     }

//     const isMatch = await bcrypt.compare(pass, user.password)

//     if (!isMatch) {
//         throw new Error('wrong pass')
//     }
//     return user
// }

userSchema.methods.genAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "voiture");
    user.token = token;
    await user.save();

    return token;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.token;

    return userObj;
};

//hashing pass
userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = hashSync(user.password);
    }

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
