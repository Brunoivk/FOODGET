const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Enter email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Enter password'],
        trim: true,
        minlength: [8, 'Password too short'],
        validate(val){
            if(val.toLowerCase().includes('password')){
                throw new Error("Your password cannot conatain 'password'")
            }
        }
    }
}, {
    timestamps: true
})


UserSchema.methods.generateAuthToken = async function(){
    const user = this
    console.log("GEN TOKEN", user._id);
    const token = jwt.sign({ _id: user._id.toString()}, 'foodnjam', {expiresIn: '10h'})
    return token
}

UserSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject

}


UserSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    console.log(password);
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch);
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

//Hesirana lozinka prije save-a
UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) 
        next(new Error('User with this email already exists'));
    else next(error);
});



const User = mongoose.model('User', UserSchema)


module.exports = User
