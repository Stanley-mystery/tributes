const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const validator = require('validator');
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'input field is required'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'email already in use']
    },
    password: {
       type: String,
       required: true
    },
    confirmpPassword: {
        type: String,
        vaildate: {
            validator: function(val){
                return val == this.password;
            },
            message: 'Confirm Password and Password dont match'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

usersSchema.pre('save', async function(next){
if(!this.isModified('password')) return next();

this.password = await bcrypt.hash(this.password, 10);

this.confirmpPassword = undefined;

}
)
  
   

module.exports = mongoose.model('User', usersSchema);