import mongoose  from "mongoose";
import bcrypt from "bcrypt";
import jwt from  "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isverified:{
        type: Boolean,
        default: false
    },
    refreshToken:{
        type: String
    }
});


userSchema.pre('save',async function (next) {
    console.log("i come here");
    if(!this.isModified("password")) return next();

    this.password = await this.hashPassword();
    next()
})

userSchema.methods.hashPassword = async function () {
    return bcrypt.hash(this.password, 8);
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateToken = async function (){
    return jwt.sign({id: this._id, email: this.email}, process.env.JWT_SECRET,{expiresIn: '1d'});
}


userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({id: this._id, email: this.email}, process.env.JWT_REFRESH_SECRET,{expiresIn: '7d'});
}

userSchema.statics.decodeRefreshToken = async function (token) {
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET)
}

userSchema.statics.decodeToken = async function (token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}


const User = mongoose.model('User', userSchema);
export default User;