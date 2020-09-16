const mongoose = require('mongoose');
const ReceptKomentar = require('./receptKomentar');


const ReceptShema = new mongoose.Schema({
    naziv:{
        type: String,
        required: [true, 'Unesite naziv jela'],
        trim: true,
        minlength: 4,
    },
    priprema: {
        type: String,
        required: [true, 'Unesite način pripreme'],
        minlength: 4, 
    },
    opis: {
        type: String,
        required: [true, 'Unesite opis recepta'],
        minlength: 4, 
    },
   vrijemePripreme: {
       type: String,
       required: [true, 'Unesiite vrijeme pripreme'],
   },
   korisnik:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User' //sa kojim modelom se povezuje
   },
   sastojci: [{
       sastojak: {
           type: String,
           trim: true
       }
   }],
   slika: {
        type: Buffer,
          
    }
}, {
    
    timestamps: true
})

//posto svaki recept ima komentare prije brisanja pojedinog recepta obriše sve komentare vezane za recept
ReceptShema.pre('remove', async function(next){
    const recept = this
    await ReceptKomentar.deleteMany({recept: recept._id})
    next()
})

//tablica recepti s kojima radimo u rutama
const Recept = mongoose.model('Recept', ReceptShema)


module.exports = Recept 
