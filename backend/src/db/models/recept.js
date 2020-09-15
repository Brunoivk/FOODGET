const mongoose = require('mongoose');
const ReceptKomentar = require('./receptKomentar');

// prvo se stvara shema te "tablice", u njoj imas sto se sve unosi
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
    //ovo omogucava da vidis kad je sta objavljeno i updejtano
    timestamps: true
})

//posto svaki recept ima komentare moras prije brisanja pojedinog recepta obrisati sve komentare vezane za njega da ti ne ostaju u bazi
ReceptShema.pre('remove', async function(next){
    const recept = this
    await ReceptKomentar.deleteMany({recept: recept._id})
    next()
})

//na kraju od sheme radis "tablicu" Recepti s kojom onda radiš u rutama
const Recept = mongoose.model('Recept', ReceptShema)


module.exports = Recept 