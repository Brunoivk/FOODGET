const mongoose = require('mongoose');


const ForumObjavaShema = new mongoose.Schema({
    sadrzaj:{
        type: String,
        required: [true, 'Unesite sadržaj objave'],
        trim: true,
        minlength: 2,
    },
    korisnik:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User' //sa kojim modelom se povezuje
   },
   email:{
       type: String,
       required: true,
   }   
}, {
    timestamps: true
})


const ForumObjava = mongoose.model('ForumObjava', ForumObjavaShema)


module.exports = ForumObjava 