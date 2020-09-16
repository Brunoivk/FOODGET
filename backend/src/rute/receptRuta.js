const express = require('express');
const Recept = require('../db/models/recept.js');
const ReceptKomentar = require('../db/models/receptKomentar.js');
const multer = require('multer')
const auth = require('../middleware/auth')

//multer sluzi za upload slika

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            return cb(null, false)
        }

        cb(undefined, true)
    }
})


//posto su rute podjeljene u vise fileova, u svakome treba instancirati novu
var ReceptRuta = new express.Router()

//ruta koja sprema u bazu
ReceptRuta.post('/api/recept', auth, upload.single('slika'), async (req, res) =>{
  
    let sastojci = req.body.sastojci.split(',').map((sastojak) =>{
        return {sastojak}
      })
    try {
        if(!req.file) return res.status(500).send({error: 'Odaberite sliku'})
        var recept = new Recept({
            ...req.body,
            slika: req.file.buffer,
            sastojci,
            korisnik: req.user._id
        })
        //pokusava spremit, ako uspije posalje sto je spremio
        await recept.save()
        res.status(200).send(recept)
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message})
    }
})

//dohvaca sve recepte
//match sluzi za pretragu 
ReceptRuta.get('/api/recept', async (req, res) =>{
    const match = {}
    const project = {}
    const random = {}
    
    //u match naziv treba odgovarati onome sto je uneseno
    if(req.query.pretraga != null && req.query.pretraga != 'undefined'){
        let termin = new RegExp(`^.*${req.query.pretraga}.*$`, "img")
        match['naziv'] = termin
    }
    if(req.query.random === 'true'){
        random['$sample'] = { size: 5 }
        project['$project'] = {_id: 1}
        
        try {
            let randomRecepti = await Recept.aggregate([random, project])
           return res.send({randomRecepti})
        } catch (error) {
            console.log(error);
           return res.status(500).send(error)
        }
    }
    try {
        console.log(match);
        //pokusava dohvatit sve po tome
        var recepti = await Recept.find(match, null).limit(10).skip(parseInt(req.query.skip) * 10)
        if(recepti.length === 0) return res.status(404).send("Nema recepata")
        res.send({recepti})
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

ReceptRuta.get('/api/me/recepti', auth, async (req, res) =>{
    try {
        let receptiUsera = await Recept.find({korisnik: req.user._id}).limit(10).skip(parseInt(req.query.skip) * 10)

        if(!receptiUsera) return res.status(404).send("Niste objavili ni jedan recept")

        res.status(200).send(receptiUsera)
    } catch (error) {
        res.status(500).send(error)
    }
})
//sluzi za dohvacanje slike za pojedini recept
ReceptRuta.get('/api/recept/:id/slika', async (req, res) => {
    try {
        const recept = await Recept.findById(req.params.id)
        if (!recept || !recept.slika) {
            throw new Error("error sa slikom")
        }
        res.set('Content-Type', 'image/png')
        res.send(recept.slika)
  
    } catch (e) {
        res.status(404).send(e)
    }
})

//dohvati jedan recept po id
ReceptRuta.get('/api/recept/:id', async (req, res) =>{
    const _id = req.params.id;
    try {
        const recept = await Recept.findOne({_id});
        if(!recept){
            return res.status(404).send({error: "Recept ne postoji"})
        }
        res.send(recept)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//dohvaca sve komentare za taj recept
ReceptRuta.get('/api/recept/:id/komentari', async (req, res) =>{
    const _id = req.params.id;
    try {
        const komentari = await ReceptKomentar.find({recept: _id});
        if(!komentari){
            return res.status(404).send({error: "Recept ne postoji"})
        }
        res.send(komentari)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//update jednog recepta
ReceptRuta.patch('/api/recept/:id', auth, async (req, res) =>{
    console.log("patch", req.body);
    
    const updates = Object.keys(req.body)

    const dozvoljenePromjene = ["naziv", "opis", "sastojci", "priprema", "vrijemePripreme"];
    const smijeLiSePromjeniti = updates.every((promjena) =>{
        return dozvoljenePromjene.includes(promjena)
    })
    if(!smijeLiSePromjeniti){
        return res.status(400)
    }
    try {
        
        const recept = await Recept.findOne({_id:req.params.id, korisnik: req.user._id})
        updates.forEach((promjena) => recept[promjena] = req.body[promjena])
        
        await recept.save()
        if(!recept){
            return res.status(404).send()
        }
        res.send(recept)
    } catch (error) {
        res.status(400).send(error)
    }
})

//nade recept po id-ju i obrise ga
ReceptRuta.delete('/api/recept/:id', auth, async (req, res) =>{
    console.log(req.user);
    const _id = req.params.id;
    try {
        const recept = await Recept.findOne({_id, korisnik: req.user._id})
        if(!recept){
            return res.status(404).send()
        }
        await recept.remove()
        res.send(recept)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = ReceptRuta
