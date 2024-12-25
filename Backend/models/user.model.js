import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName: {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long' ],
        },
    lastName: {
            type: String,
            minlength: [ 3, 'Last name must be at least 3 characters long' ],
        },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, 'Email must be at least 5 characters long' ],
    },
    Password: {
        type: String,
        required: true,
        select: false,
        minlength:[6,'Password must be at least 6 characters long'],
    },
    socketId: {
        type: String,
    },
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}


//instance method has acccess to the instance of the document
userSchema.methods.comparePassword = async function (Password) {
    return await bcrypt.compare(Password, this.Password);
}

//Static method does not have access to the instance of the document
// directly and it is called on the model.
userSchema.statics.hashPassword = async function (Password) {
    return await bcrypt.hash(Password, 10);
}

const userModel = mongoose.model('user', userSchema);

export default userModel;