const express = require('express');
const cors = require('cors');
require('./db/baza')

//importanje ruta jer sam razvodjio da ne bude sve u jednom fileu da se laske snaci
const ReceptRuta = require('./rute/receptRuta');
const ReceptKomentarRuta = require('./rute/receptKomentarRuta');
const ForumObjavaRuta = require('./rute/forumObjavaRuta');
const ForumKomentarRuta = require('./rute/forumKomentarRuta');
const UserRuta = require('./rute/user');


// instanciranje apliakcije
const app  = express()
//definiranje porta
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())



//koristenje gore importanih ruta
app.use(ReceptRuta)
app.use(ReceptKomentarRuta)
app.use(ForumObjavaRuta)
app.use(ForumKomentarRuta)
app.use(UserRuta)


app.listen(port, () =>{
    console.log(`Server je na portu ${port}`);
})
